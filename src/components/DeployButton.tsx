import React, { useState } from 'react';
import { Download, ExternalLink, Github, Globe, Loader2 } from 'lucide-react';

interface DeployButtonProps {
  generatedCode: {
    html: string;
    css: string;
    js: string;
  };
  projectName?: string;
}

const DeployButton: React.FC<DeployButtonProps> = ({ generatedCode, projectName = 'my-website' }) => {
  const [isDeploying, setIsDeploying] = useState(false);

  const downloadAsZip = async () => {
    setIsDeploying(true);
    
    try {
      // Create the complete HTML file
      const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${generatedCode.html}
  <script src="script.js"></script>
</body>
</html>`;

      // Create files content
      const files = {
        'index.html': fullHTML,
        'style.css': generatedCode.css,
        'script.js': generatedCode.js,
        'README.md': `# ${projectName}

This website was generated using KarRish AI Website Builder.

## Files
- \`index.html\` - Main HTML file
- \`style.css\` - Stylesheet
- \`script.js\` - JavaScript functionality

## Deployment
You can deploy this website to any hosting platform:
1. Upload all files to your hosting provider
2. Or drag and drop the entire folder to Netlify
3. Or push to GitHub and connect to Vercel

## Quick Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Drag and drop this folder to the deploy area
3. Your website will be live in seconds!
`
      };

      // Create and download zip file
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      Object.entries(files).forEach(([filename, content]) => {
        zip.file(filename, content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // After download, redirect to Netlify
      setTimeout(() => {
        window.open('https://app.netlify.com/drop', '_blank');
      }, 1000);

    } catch (error) {
      console.error('Error creating zip:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const deployToGitHub = () => {
    window.open('https://github.com/new', '_blank');
  };

  const deployToNetlify = () => {
    window.open('https://app.netlify.com/drop', '_blank');
  };

  const deployToVercel = () => {
    window.open('https://vercel.com/new', '_blank');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Globe className="w-5 h-5 mr-2" />
        Deploy Your Website
      </h3>
      
      <div className="space-y-4">
        <button
          onClick={downloadAsZip}
          disabled={isDeploying}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Preparing...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download & Deploy to Netlify
            </>
          )}
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={deployToGitHub}
            className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </button>
          
          <button
            onClick={deployToNetlify}
            className="flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Netlify
          </button>
          
          <button
            onClick={deployToVercel}
            className="flex items-center justify-center px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Vercel
          </button>
        </div>

        <p className="text-white/60 text-sm">
          Download your website files and deploy to your favorite hosting platform in seconds.
        </p>
      </div>
    </div>
  );
};

export default DeployButton;