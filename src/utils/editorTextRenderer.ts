import DOMPurify from "dompurify";

export const renderEditorHTML = (content?: any, limit = 300): string => {
    if (!content?.blocks || !Array.isArray(content.blocks)) return "No description available.";

    let html = "";

    for (const block of content.blocks) {
        if (block.type === "paragraph" || block.type === "header") {
            html += block.data.text + " ";
        }
    }

    // Truncate long text safely (plain text)
    const textOnly = html.replace(/<[^>]*>/g, "");
    if (textOnly.length > limit) {
        const truncated = textOnly.substring(0, limit);
        // Keep tags for truncated text
        html = html.replace(textOnly, truncated + "...");
    }

    return DOMPurify.sanitize(html);
};
