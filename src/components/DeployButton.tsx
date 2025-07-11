
import React, { useState } from 'react';
import { Download, ExternalLink, Globe, Loader2, Check } from 'lucide-react';
# button
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
  const [deployUrl, setDeployUrl] = useState<string | null>(null);

  const downloadAndDeployToNetlify = async () => {
    setIsDeploying(true);
    setDeployUrl(null);

    try {
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

      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      Object.entries(files).forEach(([filename, content]) => {
        zip.file(filename, content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });

      const formData = new FormData();
      formData.append('file', blob, `${projectName}.zip`);

      const response = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_NETLIFY_TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Netlify deployment failed');
      }

      const data = await response.json();
      setDeployUrl(data.ssl_url || data.url);
    } catch (err) {
      console.error('Deployment error:', err);
      alert('Deployment failed. Check console or API token.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Globe className="w-5 h-5 mr-2" />
        Deploy Your Website
      </h3>

      <button
        onClick={downloadAndDeployToNetlify}
        disabled={isDeploying}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
      >
        {isDeploying ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Deploying...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 mr-2" />
            Deploy to Netlify
          </>
        )}
      </button>

      {deployUrl && (
        <a
          href={deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-center text-green-400 font-medium hover:underline flex items-center justify-center"
        >
          <Check className="w-4 h-4 mr-1" />
          View Live Site
        </a>
      )}
    </div>
  );
};

export default DeployButton;
