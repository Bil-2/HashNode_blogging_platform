import { schedule } from '@netlify/functions';

const handler = async function(event, context) {
    try {
        console.log("🕒 Running scheduled keep-alive ping...");
        
        // This will poke the serverless function wrapper, forcing Netlify to keep it "warm" in memory
        // URL should be the production backend API URL. We use the Netlify API route directly.
        const healthUrl = 'https://hashnode-blogging-platform.netlify.app/.netlify/functions/api/health';
        
        const response = await fetch(healthUrl, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("✅ Keep-alive ping successful. Server status:", data.status);
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Server kept alive successfully" })
            };
        } else {
            console.warn("⚠️ Keep-alive ping returned non-200 status:", response.status);
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: "Ping failed with non-200 status" })
            };
        }
    } catch (error) {
        console.error("❌ Keep-alive ping completely failed:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Keep-alive ping error", error: error.message })
        };
    }
};

// Schedule to run every 10 minutes (* /10 * * * *)
export const config = {
    schedule: "*/10 * * * *"
};

// The modern named export way vs the `schedule("cron", handler)` wrapper way
export default handler;
