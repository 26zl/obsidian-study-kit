---
name: brain-map
description: Builds a concept map of a course as an Obsidian canvas, starting from the connections the student can recall, and strengthens the vault's knowledge graph by proposing links between related notes. The student names the connections first, then the agent checks them against the sources, draws the canvas with labelled links and lists the gaps. Use when the student wants a mind map, concept map, brain map, knowledge graph, an overview of how topics connect, a visual summary of a course, or a graph view that shows more connections.
license: MIT
---

# Brain map

A map of how the ideas in a course connect. It helps learning when the student does the connecting from memory: building a concept map without the text works as retrieval practice, while building one with the text open is closer to rereading (Karpicke & Blunt, 2011; Blunt & Karpicke, 2014). So the student names the links first, and the agent turns them into a canvas and checks them against the sources.

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`.

## 1. Scope

Agree on the course, and whether the map covers all of it or one part. Read the course home and its `topics/` folder. More than about 25 topics on one canvas is hard to read, so suggest one map per part of the course.

## 2. Connections from memory

Ask the student, without opening anything, to name pairs of topics that are connected and to say how in a few words, for example "spacing makes retrieval harder, and that helps". A rough list is fine. Ask for at least five pairs, then which topic they think is the centre of the course.

Then compare the list with the topic notes and sources, and answer in three short lists:

- connections that are right, each with a reference;
- connections that are wrong or backwards, each with the correction and a reference;
- important connections they left out. Name the two topics and ask how they connect before you say it.

Append the session to the progress log of the central topic:

```markdown
## 2026-11-15 · brain-map
- **Connections named:** 7, of which 5 right
- **Wrong or backwards:** each one, one line
- **Missed:** the connections they did not name
- **Next:** one concrete exercise for the next session
```

A new log file starts with the same frontmatter and heading as in `tutor`.

## 3. Draw the canvas

Write `courses/<CODE>/<CODE>.canvas`, or `<CODE>-<part>.canvas` for one part. If the file exists, add to it: keep the student's own nodes, edges and positions, and never remove anything they made.

Use the format in `references/json-canvas.md`:

- one file node per topic note, so clicking a node opens the note;
- the course home, or the topic the student named as the centre, in the middle;
- one edge per confirmed connection, labelled in the student's own words where they were right;
- edge colour `"4"` (green) for connections the student named, `"6"` (purple) for connections added from the sources, and a small text node that explains the two colours;
- a text node "Gaps" listing connections the sources make that no note covers yet.

Place the centre in the middle, its direct neighbours in a ring around it, and the rest further out. Keep at least 80 pixels between nodes so the edge labels stay readable.

## 4. Strengthen the graph

The graph view draws links between notes, so a topic that never links to another is an island. For the topics on the map, list:

- connections confirmed in step 2 that are not links in the notes yet;
- notes that mention another topic by name without linking it.

Propose each link as one line: which note, where, and the link. Topic notes and every note without `origin: ai-draft` belong to the student. Add a link there only after a yes, as a new line under "Key points" or "Related", never by rewriting their text. In notes the agent wrote (`origin: ai-draft`), add links under "Related" and say what you added.

## 5. Hand over

Tell the student where the canvas is, and suggest two things: open the graph view (Ctrl or Cmd + G) to see the course as one cluster, and tomorrow explain the map aloud from the centre outwards without looking. Offer `recall` or `exam-trainer` on the weakest connection.
