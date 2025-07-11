import React, { useState } from 'react';
import { Download, ExternalLink, Github, Globe, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import sha1  from 'js-sha1';

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

  const generateFiles = () => {
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
${generatedCode.html}
  <script src="script.js"></script>
</body>
</html>`;

    return {
      'index.html': indexHtml,
      'style.css': generatedCode.css,
      'script.js': generatedCode.js,
    };
  };

  const downloadAsZip = async () => {
    setIsDeploying(true);
    const files = generateFiles();

    console.log(files);
    const zip = new JSZip();

    for (const [filename, content] of Object.entries(files)) {
      zip.file(filename, content);
    }
    console.log(zip);
    const blob = await zip.generateAsync({ type: 'blob' });
    console.log(blob);
    const url = URL.createObjectURL(blob);
    console.log(url);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsDeploying(false);

    // Optional: open Netlify drag-drop page
    setTimeout(() => {
      window.open('https://app.netlify.com/drop', '_blank');
    }, 1000);
  };

  const deployToNetlify = async () => {
    const files = generateFiles();
    const token = import.meta.env.VITE_NETLIFY_DEPLOY_KEY;
    if (!token) {
      alert("Missing Netlify Deploy Key in environment");
      return;
    }

    try {
      setIsDeploying(true);

      const fileEntries = Object.entries(files).map(([path, content]) => ({
        path,
        content: new TextEncoder().encode(content),
        sha: sha1(content),
      }));

      const deployFilesMap: Record<string, string> = {};
      fileEntries.forEach(file => {
        deployFilesMap[file.path] = file.sha;
      });

      // 1. Create deploy
      const deployRes = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: `karrish-${Date.now()}` }),
      });
      const siteData = await deployRes.json();

      const deployCreateRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}/deploys`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: deployFilesMap,
        }),
      });
      const deployData = await deployCreateRes.json();

      // 2. Upload files if missing
      await Promise.all(fileEntries.map(file => {
        return fetch(`https://api.netlify.com/api/v1/deploys/${deployData.id}/files/${file.path}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/octet-stream',
          },
          body: file.content,
        });
      }));

      // // ✅ Done
      // window.open(`https://${siteData.name}.netlify.app`, '_blank');
      // ✅ Done — use the URL returned by the deploy API
     // deployData contains ssl_url or deploy_ssl_url
    const liveUrl = deployData.deploy_ssl_url || deployData.ssl_url;
      console.log(liveUrl);
     if (liveUrl) {
       window.open(liveUrl, '_blank');
     } else {
       // fallback if not present
       window.open(`https://${siteData.name}.netlify.app`, '_blank');
     }

    } catch (err) {
      console.error('Deploy error:', err);
      alert("Deploy failed. Check console for details.");
    } finally {
      setIsDeploying(false);
    }
  };

  const deployToGitHub = () => {
    window.open('https://github.com/new', '_blank');
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

        <button
          onClick={deployToNetlify}
          disabled={isDeploying}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              <ExternalLink className="w-5 h-5 mr-2" />
              Instant Deploy to Netlify
            </>
          )}
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={deployToGitHub}
            className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
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
          Download or deploy your website instantly to your favorite hosting platform.
        </p>
      </div>
    </div>
  );
};

export default DeployButton;
