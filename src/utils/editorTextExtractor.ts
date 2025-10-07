export const extractEditorText = (content?: any, limit = 200): string => {
    if (!content?.blocks) return "No description available.";

    const firstHeader = content.blocks.find((b: any) => b.type === "header")?.data?.text || "";
    const firstParagraph = content.blocks.find((b: any) => b.type === "paragraph")?.data?.text || "";

    const combined = `${firstHeader ? firstHeader + ": " : ""}${firstParagraph}`
        .replace(/<[^>]*>/g, "")
        .trim();

    return combined.length > limit ? combined.substring(0, limit) + "..." : combined;
};
