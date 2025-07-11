// import React, { useState, useRef, useEffect } from 'react';
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import { GoogleGenerativeAI } from '@google/generative-ai';
import DeployButton from './DeployButton';
import ChatHistory from './ChatHistory';
import { 
  Code, 
  Play, 
  Download, 
  Copy, 
  Loader2, 
  Eye, 
  EyeOff,
  Sparkles,
  FileCode,
  Palette,
  Zap,
  X,
  History,
  MessageSquare,
  Maximize,
  Minimize
} from 'lucide-react';

interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  prompt: string;
  generatedCode: GeneratedCode;
}

interface CodeGeneratorProps {
  onClose: () => void;
}

export interface CodeGeneratorRef {
  toggleHistory: () => void;
}

const CodeGenerator = forwardRef<CodeGeneratorRef, CodeGeneratorProps>(({ onClose }, ref) => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode>({ html: '', css: '', js: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [error, setError] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [needsPreviewUpdate, setNeedsPreviewUpdate] = useState(false); // ✅ NEW

  const iframeRef = useRef<HTMLIFrameElement>(null);
  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const [showPreview, setShowPreview] = useState(true);

  // const bottomRef = useRef<HTMLDivElement>(null);
const scrollContainerRef = useRef<HTMLDivElement>(null);
const generatedSectionRef = useRef<HTMLDivElement>(null);

useImperativeHandle(ref, () => ({
  toggleHistory: () => {
    setShowChatHistory(prev => !prev);
  }
}));

const PEXELS_API_KEY = "XvWmsM8koeEX2GHcetS2lCjkzM4O7QPuJ65KVuVj9PkOBOjC3W5EeXpK";
const fetchPexelsImage = async (query: string): Promise<string> => {
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large;
    }
  } catch (err) {
    console.error("Error fetching Pexels image:", err);
  }
  return "https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg?cs=srgb&dl=pexels-pixabay-53435.jpg&fm=jpg"; // fallback
};
  // Load chat sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      try { 
        // const sessions = JSON.parse(savedSessions).map((session: any) => ({
        //   ...session,
        //   timestamp: new Date(session.timestamp)
        // }));
        const parsed = JSON.parse(savedSessions);
        if (Array.isArray(parsed) && parsed.every(s => s.id && s.generatedCode)) {
          const sessions = parsed.map((session: any) => ({
            ...session,
            timestamp: new Date(session.timestamp)
          }));
          setChatSessions(sessions.slice(0, 10));
        }
        // setChatSessions(sessions.slice(0, 10)); // Keep only last 10 sessions
      } catch (error) {
        console.error('Error loading chat sessions:', error);
      }
    }
  }, []);
  
  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions.slice(0, 10)));
    }
  }, [chatSessions]);
useEffect(() => {
  if (needsPreviewUpdate && showPreview && iframeRef.current) {
    updatePreview();
    setNeedsPreviewUpdate(false);
  }
}, [needsPreviewUpdate, showPreview, generatedCode]);
// useEffect(() => {
//   if (needsPreviewUpdate && showPreview && iframeRef.current) {
//     updatePreview();
//     setPendingPreviewUpdate(false);
//   }
// }, [pendingPreviewUpdate, showPreview, iframeRef.current]);
//   useEffect(() => {
//   if (isStreaming && bottomRef.current) {
//     bottomRef.current.scrollIntoView({ behavior: "smooth" });
//   }
// }, [streamingText]);

useEffect(() => {
  if (isStreaming && scrollContainerRef.current) {
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  }
}, [streamingText]);

const generateCode = async () => {
  if (!prompt.trim()) return;

  setStreamingText('');
  setGeneratedCode({ html: '', css: '', js: '' });
  setShowPreview(true);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    setError('Please add your Google Generative AI API key to the .env file.');
    return;
  }

  setIsGenerating(true);
  setError('');
  setIsStreaming(true);

  try {
    const imageURL = await fetchPexelsImage(prompt);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are an expert web developer. Generate clean, modern, and functional HTML, CSS, and JavaScript code based on the user's request.

Rules:
1. Always provide complete, working code
2. Use modern CSS with flexbox/grid for layouts
3. Make designs responsive and visually appealing
4. Include proper semantic HTML
5. Add interactive JavaScript when appropriate
6. Use modern ES6+ JavaScript syntax
7. Ensure cross-browser compatibility
8. Use only the following image in your output: ${imageURL}
9. Only use standard Font Awesome CDN. Do NOT generate or repeat integrity values manually.


Format your response EXACTLY like this:
HTML:
\`\`\`html
[HTML code here]
\`\`\`

CSS:
\`\`\`css
[CSS code here]
\`\`\`

JavaScript:
\`\`\`javascript
[JavaScript code here]
\`\`\`

User Request: ${prompt}`;

    const result = await model.generateContentStream(systemPrompt);
    let fullText = '';
    // for await (const chunk of result.stream) {
    //   const chunkText = chunk.text();
    //   fullText += chunkText;
    //   setStreamingText(fullText);
    // }
    let isMounted = true;
try {
  const result = await model.generateContentStream(systemPrompt);
  for await (const chunk of result.stream) {
        if (!isMounted) return;
        const chunkText = chunk.text();
        fullText += chunkText;
        setStreamingText(fullText);
      }
    } finally {
      if (isMounted) {
        setIsGenerating(false);
        setIsStreaming(false);
      }
    }


    setIsStreaming(false);

    const htmlMatch = fullText.match(/HTML:\s*```html\s*([\s\S]*?)\s*```/i);
    const cssMatch = fullText.match(/CSS:\s*```css\s*([\s\S]*?)\s*```/i);
    const jsMatch = fullText.match(/JavaScript:\s*```javascript\s*([\s\S]*?)\s*```/i);

    const code = {
      html: htmlMatch ? htmlMatch[1].trim() : '',
      css: cssMatch ? cssMatch[1].trim() : '',
      js: jsMatch ? jsMatch[1].trim() : ''
    };

    setGeneratedCode(code);

    const newSession = {
      id: Date.now().toString(),
      title: prompt.slice(0, 50) + (prompt.length > 50 ? '...' : ''),
      timestamp: new Date(),
      prompt,
      generatedCode: code
    };

    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setShowPreview(true);
    setNeedsPreviewUpdate(true);
    setPrompt('');

  } catch (err) {
    setError('Failed to generate code. Please try again.');
    console.error('Error generating code:', err);
  } finally {
    setIsGenerating(false);
    setIsStreaming(false);
    setShowPreview(true);
  }
};


const updatePreview = () => {
  if (!iframeRef.current) return;

  const { html, css, js } = generatedCode;

  // Replace broken or relative image URLs with a fallback image
  const safeHtml = html.replace(
    /<img\s+[^>]*src="([^"]+)"[^>]*>/g,
    (match, src) => {
      // If src is not a full URL, replace it
      if (!src.startsWith('http')) {
        const fallback = 'https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg?cs=srgb&dl=pexels-pixabay-53435.jpg&fm=jpg';
        return match.replace(src, fallback);
      }
      return match;
    }
  );

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Website</title>
      <style>
        ${css}
      </style>
    </head>
    <body>
      ${safeHtml}
      <script>
        ${js}
      </script>
    </body>
    </html>
  `;

  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  iframeRef.current.src = url;
};


  useEffect(() => {
    if (generatedCode.html && showPreview) {
      updatePreview();
    }
    if (generatedCode.html && isFullscreen) {
      updatePreview();
    }
  }, [generatedCode, showPreview, isFullscreen]);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy code:", err);
      alert("Copy failed. Please copy manually.");
    }
  };

  const downloadCode = () => {
    const { html, css, js } = generatedCode;
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  </script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-website.html';
    a.click();
    // URL.revokeObjectURL(url);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

  };

  const loadChatSession = (session: ChatSession) => {
  setPrompt('');
  setGeneratedCode(session.generatedCode);
  setCurrentSessionId(session.id);
  setStreamingText('');
  setError('');

  setShowPreview(true);
  setShowChatHistory(false);
  setNeedsPreviewUpdate(true);

  // Safely scroll to generated section after a short delay
  setTimeout(() => {
    const section = generatedSectionRef.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, 300);
};


  const deleteChatSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(session => session.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setGeneratedCode({ html: '', css: '', js: '' });
      setPrompt('');
      setShowPreview(true);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(true);
    // Auto-refresh when entering fullscreen
    setTimeout(() => {
      updatePreview();
    }, 100);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    // Scroll to AI builder when exiting fullscreen
    setTimeout(() => {
      document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const examplePrompts = [
    "Create a modern landing page for a coffee shop with hero section and menu",
    "Build a responsive portfolio website with dark theme and animations",
    "Design a calculator app with modern UI and full functionality",
    "Create a todo list app with add, delete, and mark complete features",
    "Build a weather dashboard with cards and modern design"
  ];

  return (
    <section id="ai-builder" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-center flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              AI Website Builder
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Live Studio</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experience the power of AI-driven web development. Describe your vision and watch as our AI creates beautiful, functional websites in seconds.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              // onClick={() => setShowChatHistory(!showChatHistory)}
              onClick={() => setShowChatHistory(prev => {
                // If currently hidden, show it. If shown, toggle off.
                return !prev;
              })}
              className="flex items-center space-x-2 bg-red-500 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-red-500/20 transition-all duration-300"
            >
              <History className="w-5 h-5" />
              <span>History ({chatSessions.length})</span>
            </button>
            
            {/* <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button> */}
          </div>
        </div>
        
        {/* Chat History Sidebar */}
        {showChatHistory && (
          <ChatHistory 
            sessions={chatSessions}
            onLoadSession={loadChatSession}
            onDeleteSession={deleteChatSession}
            currentSessionId={currentSessionId}
          />
        )}

        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">
              Describe your website idea:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a modern portfolio website with dark theme, hero section, about me, projects gallery, and contact form..."
              className="w-full h-32 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
            />
          </div>

          {/* Example Prompts */}
          <div className="mb-6">
            <p className="text-white/70 text-sm mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white/80 px-3 py-2 rounded-lg transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateCode}
            disabled={isGenerating || !prompt.trim()}
            className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2 inline-block group-hover:rotate-12 transition-transform" />
                Generate Website
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* Live AI Response */}
        {(isStreaming || streamingText) && (
  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
    <div className="flex items-center mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-white font-semibold">
          AI is generating your code...
        </span>
      </div>
    </div>

    {/* ★ Scrollable container ★ */}
    <div
      ref={scrollContainerRef}
      className="bg-black/20 rounded-lg p-4 max-h-64 overflow-auto"
    >
      <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
        {streamingText}
        {isStreaming && <span className="animate-pulse">|</span>}
      </pre>
    </div>
  </div>
)}
        {/* const generatedSectionRef = useRef<HTMLDivElement>(null); */}


        {/* Generated Code and Preview */}
        {generatedCode.html && (
          <div ref={generatedSectionRef} className="space-y-8">
            {/* Fullscreen Preview Modal */}
            {isFullscreen && (
              <div className="fixed inset-0 z-50 bg-black flex flex-col">
                <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
                  <h3 className="text-white font-semibold flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    Fullscreen Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={exitFullscreen}
                      className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Minimize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative">
                  {!generatedCode.html ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Loader2 className="w-12 h-12 text-white/50 mx-auto mb-4 animate-spin" />
                        <p className="text-white/70">Loading preview...</p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      ref={iframeRef}
                      className="w-full h-full border-0"
                      title="Fullscreen Website Preview"
                    />
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'html' 
                        ? 'bg-purple-500 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <FileCode className="w-4 h-4 mr-2 inline-block" />
                    HTML
                  </button>
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'css' 
                        ? 'bg-purple-500 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Palette className="w-4 h-4 mr-2 inline-block" />
                    CSS
                  </button>
                  <button
                    onClick={() => setActiveTab('js')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'js' 
                        ? 'bg-purple-500 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Zap className="w-4 h-4 mr-2 inline-block" />
                    JavaScript
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(generatedCode[activeTab])}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadCode}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Download HTML file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <pre className="text-sm text-white/90 overflow-auto max-h-96 bg-black/20 rounded-lg p-4">
                  <code>{generatedCode[activeTab]}</code>
                </pre>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-semibold flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Live Preview
                </h3>
                <button
                  onClick={() => setShowPreview(true)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Toggle preview"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {showPreview && (
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Fullscreen preview"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="h-96">
                {showPreview ? (
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0"
                    title="Generated Website Preview"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white/50">
                    <div className="text-center">
                      <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click the eye icon to show preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
            
            {/* Deploy Section */}
            <DeployButton generatedCode={generatedCode} projectName="ai-generated-website" />
          </div>
        )}
      </div>
    </section>
  );
};

export default CodeGenerator as React.ForwardRefExoticComponent<
  CodeGeneratorProps & React.RefAttributes<CodeGeneratorRef>
>;
