import DOMPurify from "dompurify";

export const renderEditorHTML = (content?: any, limit?: number): string => {
    if (!content?.blocks || !Array.isArray(content.blocks))
        return "No description available.";

    let html = "";

    for (const block of content.blocks) {
        switch (block.type) {
            case "header":
                html += `<h${block.data.level || 2} class="font-semibold mb-2">${block.data.text
                    }</h${block.data.level || 2}>`;
                break;

            case "paragraph":
                html += `<p class="mb-3">${block.data.text}</p>`;
                break;

            case "list":
                if (block.data.style === "ordered") {
                    html += `<ol class="list-decimal list-inside mb-3">${block.data.items
                        .map((item: string) => `<li>${item}</li>`)
                        .join("")}</ol>`;
                } else {
                    html += `<ul class="list-disc list-inside mb-3">${block.data.items
                        .map((item: string) => `<li>${item}</li>`)
                        .join("")}</ul>`;
                }
                break;

            case "quote":
                html += `<blockquote class="border-l-4 pl-4 italic mb-3 text-muted-foreground">"${block.data.text}"</blockquote>`;
                break;

            case "code":
                html += `<pre class="bg-muted p-3 rounded-md text-sm overflow-x-auto mb-3"><code>${block.data.code}</code></pre>`;
                break;

            case "delimiter":
                html += `<hr class="my-6 border-muted" />`;
                break;

            case "image":
                html += `<figure class="my-4">
                  <img src="${block.data.file?.url}" alt="${block.data.caption || ""}" class="rounded-md max-h-72 object-cover w-full" />
                  ${block.data.caption
                        ? `<figcaption class="text-center text-sm mt-2 text-muted-foreground">${block.data.caption}</figcaption>`
                        : ""
                    }
                </figure>`;
                break;

            case "embed":
                html += `<div class="aspect-video my-4">
                  <iframe 
                    src="${block.data.embed}" 
                    frameborder="0" 
                    allowfullscreen 
                    class="w-full h-full rounded-md">
                  </iframe>
                </div>`;
                break;

            case "table":
                if (block.data.content && Array.isArray(block.data.content)) {
                    html += `<table class="w-full border border-muted text-sm mb-4">
            <tbody>
              ${block.data.content
                            .map(
                                (row: string[]) =>
                                    `<tr>${row
                                        .map((cell: string) => `<td class="border px-3 py-2">${cell}</td>`)
                                        .join("")}</tr>`
                            )
                            .join("")}
            </tbody>
          </table>`;
                }
                break;

            default:
                if (block.data?.text) html += `<p>${block.data.text}</p>`;
                break;
        }
    }

    // ✅ If limit not provided → show full content
    if (!limit) return DOMPurify.sanitize(html);

    // ✅ Else, safely truncate based on visible text
    const textOnly = html.replace(/<[^>]*>/g, "");
    if (textOnly.length > limit) {
        const truncated = textOnly.substring(0, limit).trim() + "...";
        html = `<p>${truncated}</p>`;
    }

    return DOMPurify.sanitize(html);
};
