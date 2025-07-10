import React from 'react';
import { Trash2, MessageSquare, Clock } from 'lucide-react';

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

interface ChatHistoryProps {
  sessions: ChatSession[];
  onLoadSession: (session: ChatSession) => void;
  onDeleteSession: (sessionId: string) => void;
  currentSessionId: string | null;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  sessions, 
  onLoadSession, 
  onDeleteSession, 
  currentSessionId 
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Chat History
        </h3>
        <span className="text-white/60 text-sm">{sessions.length} sessions</span>
      </div>
      
      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/60">No chat sessions yet</p>
          <p className="text-white/40 text-sm">Start building to create your first session</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                currentSessionId === session.id
                  ? 'bg-purple-500/20 border-purple-400/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              onClick={() => onLoadSession(session)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate mb-1">
                    {session.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(session.timestamp)}</span>
                    {session.generatedCode.html && (
                      <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">
                        Generated
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-xs mt-2 line-clamp-2">
                    {session.prompt}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;