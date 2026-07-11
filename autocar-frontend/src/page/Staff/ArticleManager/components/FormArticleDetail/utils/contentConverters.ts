// // ─── Pure functions: convert dữ liệu hiển thị ↔ dữ liệu lưu trữ ──────────────
// // Không phụ thuộc React/react-hook-form → test bằng Jest thuần, không cần mock.

// import type { ArticleSection } from "../../../../../../types/articles";

// // ── Section content (list ↔ textarea) ───────────────────────────────────────

// /** content (string | string[]) → text hiển thị trong textarea */
// export const contentToDisplay = (content: ArticleSection["content"]): string =>
//   Array.isArray(content) ? content.join("\n") : (content ?? "");

// /** text trong textarea → giá trị lưu vào form theo loại section */
// export const displayToContent = (
//   raw: string,
//   sectionType: string,
// ): string | string[] => (sectionType === "list" ? raw.split("\n") : raw);

// /** Dọn dẹp list: trim từng dòng + loại bỏ dòng trống (gọi khi blur) */
// export const cleanListContent = (
//   content: ArticleSection["content"],
// ): string[] =>
//   Array.isArray(content) ? content.map((s) => s.trim()).filter(Boolean) : [];

// // ── Tags (string[] ↔ input text) ──────────────────────────────────────────────

// /** tags array → string hiển thị trong input ("tag1, tag2") */
// export const tagsToDisplay = (tags: string[] = []): string => tags.join(", ");

// /** input text → tags array, tách bằng dấu phẩy */
// export const displayToTags = (raw: string): string[] =>
//   raw
//     .split(",")
//     .map((s) => s.trim())
//     .filter(Boolean);
