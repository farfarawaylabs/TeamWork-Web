export function transformToMarkdown(input: string): string {
  // Replace \n with two spaces followed by a newline to preserve newlines in Markdown
  let output = input.replace(/\\n/g, "  \n");

  // Replace \t with four spaces to preserve tabs in Markdown
  output = output.replace(/\\t/g, "    ");

  // Wrap code blocks inside triple backticks
  output = output.replace(/```/g, "```\n").replace(/```\n\n```/g, "```");

  return output;
}
