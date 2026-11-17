# JSON Canvas, the parts this skill uses

Obsidian's `.canvas` files follow the open JSON Canvas 1.0 format (jsoncanvas.org, MIT licence). A canvas is one JSON object with two lists, `nodes` and `edges`. Write it as UTF-8 JSON with two-space indentation, and keep every `id` unique within the file.

## Nodes

Every node has:

| Key | Value |
|---|---|
| `id` | A unique string. Short readable ids such as `"spacing"` are fine |
| `type` | `"text"`, `"file"`, `"link"` or `"group"` |
| `x`, `y` | Integers, the top-left corner in pixels. `y` grows downwards |
| `width`, `height` | Integers in pixels |
| `color` | Optional. `"1"` red, `"2"` orange, `"3"` yellow, `"4"` green, `"5"` cyan, `"6"` purple, or a hex colour such as `"#4E79A7"` |

By type:

| Type | Extra keys |
|---|---|
| `text` | `text`: Markdown shown in the node |
| `file` | `file`: the path from the vault root, such as `"courses/DEMO101/topics/spacing.md"`. Optional `subpath`: a heading, such as `"#Key points"` |
| `link` | `url`: a web address |
| `group` | Optional `label`. Nodes inside its rectangle belong to it |

Sizes that read well: 260 by 80 for a file node shown as a title, 400 by 300 for a file node that previews the note, 300 by 160 for a text node.

## Edges

| Key | Value |
|---|---|
| `id` | A unique string |
| `fromNode`, `toNode` | Node ids |
| `fromSide`, `toSide` | Optional: `"top"`, `"right"`, `"bottom"` or `"left"` |
| `fromEnd`, `toEnd` | Optional: `"none"` or `"arrow"`. The defaults are no arrow at the start and an arrow at the end |
| `color` | Optional, as for nodes |
| `label` | Optional text shown on the edge |

Use `toEnd: "none"` for a connection that has no direction, such as "is often confused with".

## Example

```json
{
  "nodes": [
    { "id": "home", "type": "file", "file": "courses/DEMO101/DEMO101.md", "x": -130, "y": -40, "width": 260, "height": 80, "color": "3" },
    { "id": "spacing", "type": "file", "file": "courses/DEMO101/topics/spacing.md", "x": -520, "y": 220, "width": 260, "height": 80 },
    { "id": "legend", "type": "text", "text": "Green: links you named\nPurple: links added from the sources", "x": 300, "y": -260, "width": 300, "height": 100 }
  ],
  "edges": [
    { "id": "home-spacing", "fromNode": "home", "fromSide": "bottom", "toNode": "spacing", "toSide": "top", "color": "4", "label": "spread the same study time out" }
  ]
}
```
