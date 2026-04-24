# Contributing to Documentation

> Guidelines for maintaining high-quality documentation

---

## 📋 Table of Contents

1. [Before You Write](#before-you-write)
2. [Writing Guidelines](#writing-guidelines)
3. [File Structure](#file-structure)
4. [Code Examples](#code-examples)
5. [Review Process](#review-process)
6. [Tools & Resources](#tools--resources)

---

## Before You Write

### Checklist
- [ ] Check if documentation already exists (search first!)
- [ ] Check if it's outdated (if so, update instead of creating new)
- [ ] Determine the appropriate folder
- [ ] Choose a descriptive filename in `kebab-case`
- [ ] Plan the structure (headings, sections, examples)

### Ask Yourself
- **Who is the audience?** (new dev, senior dev, product manager?)
- **What problem does this solve?**
- **Is this a how-to, reference, or conceptual document?**

---

## Writing Guidelines

### General Rules
- Write in **clear, concise English**
- Use **active voice** ("you will see" not "it will be seen")
- **One topic per section**
- Use **short paragraphs** (3-5 sentences max)
- **Avoid jargon** unless necessary (explain if you use it)

### Formatting

#### Headings
```markdown
# Main Title (H1) - One per document
## Major Section (H2)
### Subsection (H3)
#### Details (H4)
```

#### Lists
```markdown
- Use bullets for unordered lists
- Keep items parallel in structure
- Avoid nesting more than 2 levels

1. Use numbers for sequential steps
2. Each step should be actionable
3. Include commands or code
```

#### Emphasis
```markdown
**Bold** for important concepts
*Italic* for file names, paths, variables
`Code` for inline code, commands
```

#### Blockquotes
```markdown
> Use for important notes
> Can span multiple lines
> Great for warnings ⚠️
```

#### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

---

## File Structure

### Front Matter
Every document should start with:
```markdown
# Document Title

> Short description of what this document covers
> Can be 1-2 lines

---

## 📋 Table of Contents

1. [Section 1](#section-1)
2. [Section 2](#section-2)
3. [References](#references)

---
```

### Standard Sections
```markdown
## Overview
Describe what this document is about (2-3 paragraphs)

## Prerequisites
- Item 1
- Item 2
- Item 3

## Steps / Implementation
### Step 1: Description
Detailed explanation

### Step 2: Description
Detailed explanation

## Examples
Provide working examples

## Troubleshooting
Common issues and solutions

## See Also
- [Related Doc 1](link)
- [Related Doc 2](link)

## References
- [External Resource](url)

---

**Last Updated**: YYYY-MM-DD  
**Version**: X.Y.Z  
**Maintained By**: [Name/Team]
```

---

## Code Examples

### Requirements
- **Must be complete and runnable**
- **Include error handling**
- **Show both success and error cases**
- **Use real-world examples**

### Format
```markdown
### Example: Creating a User

**File**: `src/controllers/user.controller.ts`

```typescript
// This is actual code from the project
@Post('/users')
async createUser(@Body() dto: CreateUserDto): Promise<UserResponse> {
  try {
    const user = await this.userService.create(dto);
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}
```

**Expected Response**:
```json
{
  "id": "usr-123",
  "email": "user@example.com",
  "fullName": "John Doe"
}
```

**Error Handling**:
```json
{
  "statusCode": 400,
  "message": "Email already exists",
  "error": "BadRequest"
}
```
```

### Language Support
```markdown
\`\`\`typescript
// TypeScript code
\`\`\`

\`\`\`javascript
// JavaScript code
\`\`\`

\`\`\`sql
-- SQL code
\`\`\`

\`\`\`bash
# Bash/Shell code
# Use $ for commands
$ npm install
\`\`\`

\`\`\`json
// JSON examples
\`\`\`
```

---

## Diagrams & Images

### Adding Diagrams
```markdown
### System Architecture

![System Architecture Diagram](./assets/system-architecture.png)

**Description**: This diagram shows how all microservices interact...
```

### Image Guidelines
- Store in `./assets/` subdirectory
- Use descriptive names: `auth-flow.png` not `diagram1.png`
- Include alt text (for accessibility)
- Keep file size < 500KB (compress if needed)
- Use PNG or SVG format
- Add description below image

### Creating Diagrams
- Use **Mermaid** for flowcharts (embed in markdown)
- Use **Lucidchart**, **Draw.io**, or **PlantUML** for complex diagrams
- Export as PNG/SVG
- Keep diagrams simple and readable

---

## Review Process

### Before Submitting
1. **Proofread**: Check spelling & grammar
2. **Test Code**: All examples must work
3. **Verify Links**: Check all internal links
4. **Add Metadata**: Include "Last Updated" date
5. **Self-Review**: Read it as a new developer would

### Submission
```markdown
# Pull Request Template

**Type**: Documentation (new/update/fix)

**What**: Brief description of changes

**Why**: Why is this documentation needed?

**Related Issue**: #123 (if applicable)

**Checklist**:
- [ ] Spelling & grammar checked
- [ ] Code examples tested
- [ ] Links verified
- [ ] Follows style guide
- [ ] Appropriate folder
- [ ] Added to docs/README.md
```

### Review Criteria (Tech Lead Will Check)
- ✅ Accuracy (technical correctness)
- ✅ Clarity (easy to understand)
- ✅ Completeness (covers the topic)
- ✅ Examples (real, working code)
- ✅ Consistency (matches other docs)
- ✅ Structure (logical organization)

---

## Tools & Resources

### Markdown Editors
- **VS Code** with Markdown All-in-One extension
- **Obsidian** for knowledge management
- **GitHub** (online editor)
- **Typora** for advanced formatting

### Tools
- **Mermaid** for diagrams (https://mermaid.js.org)
- **PlantUML** for UML diagrams (https://www.plantuml.com)
- **Markdown Table Generator** (https://www.tablesgenerator.com/markdown_tables)
- **MkDocs** for static site generation (optional)

### References
- [GitHub Markdown Guide](https://docs.github.com/en/get-started/writing-on-github)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [Google Technical Writing](https://developers.google.com/tech-writing)
- [Diátaxis Framework](https://diataxis.fr/) - Documentation approach

---

## Templates

### Template: How-To Guide
```markdown
# How to [Do Something]

> Brief description

## Prerequisites
- Requirement 1
- Requirement 2

## Steps
### Step 1: [Title]
Explanation

\`\`\`bash
$ command here
\`\`\`

### Step 2: [Title]
Continue...

## Troubleshooting
**Issue**: ...
**Solution**: ...

## Next Steps
What to do after completing this guide?
```

### Template: API Endpoint
```markdown
## GET /api/users/:id

> Retrieve a single user by ID

### Request
**Method**: GET  
**Auth Required**: Yes (Bearer Token)

### Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| id   | UUID | Yes      | User ID     |

### Response
**Status**: 200 OK

\`\`\`json
{
  "id": "usr-123",
  "email": "user@example.com"
}
\`\`\`

### Error Responses
**Status**: 404 Not Found
\`\`\`json
{
  "message": "User not found"
}
\`\`\`
```

### Template: Service Documentation
```markdown
# [Service Name] Service

> What this service does

## Overview
Detailed description

## Architecture
High-level architecture explanation

## API Endpoints
- GET /endpoint1
- POST /endpoint2

## Database
Tables used:
- table1
- table2

## Dependencies
- Other services this depends on
- External APIs

## Configuration
Required environment variables

## Running Locally
Steps to run this service locally

## Testing
How to test this service

## Deployment
Special considerations for deployment
```

---

## Common Mistakes to Avoid

❌ **DON'T**:
- Use outdated information without updating the date
- Write multiple topics in one document
- Mix technical and non-technical content
- Include personal opinions
- Write walls of text without breaking
- Use unclear acronyms without defining them
- Forget to add "Last Updated" date
- Leave broken links
- Test code in documentation (it won't work)

✅ **DO**:
- Keep it simple and scannable
- One topic = one document
- Update regularly
- Use consistent style
- Add examples
- Define all acronyms first use
- Link to related docs
- Test everything locally first
- Make it easy to find

---

## Questions?

- Ask the Tech Lead
- Check other docs for examples
- Slack/Chat the team

---

**Version**: 1.0.0  
**Last Updated**: 2026-04-25
