export const BOOKS = [
  { id: "matthew", name: "Matthew", chapters: 28 },
  { id: "mark", name: "Mark", chapters: 16 },
  { id: "luke", name: "Luke", chapters: 24 },
  { id: "john", name: "John", chapters: 21 }
];

export const TRANSLATIONS = [
  { id: "kjv", name: "KJV", full: "King James Version (1769)" },
  { id: "asv", name: "ASV", full: "American Standard Version (1901)" },
  { id: "bbe", name: "BBE", full: "Bible in Basic English" }
];

export const G_PAR = "Gospel parallels";
export const G_OT = "Old Testament";
export const G_NT = "Elsewhere in the New Testament";
export const G_LANG = "Language note";

/* Starter connections. go = [[book, chapter, verse], ...] opens that verse. */
export const CONN = [
  // John 1
  { book: "john", ch: 1, from: 1, to: 1, g: G_OT, ref: "Genesis 1:1", note: "Opens with the same words as the creation account." },
  { book: "john", ch: 1, from: 1, to: 1, g: G_LANG, ref: "“Word” (Greek logos)", note: "Can mean word, reason, or message; here it names a divine agent present at creation." },
  { book: "john", ch: 1, from: 1, to: 5, g: G_OT, ref: "Genesis 1:3–5", note: "Light and darkness echo the first day of creation." },
  { book: "john", ch: 1, from: 1, to: 1, g: G_NT, ref: "1 John 1:1", note: "Another opening that begins “from the beginning.”" },
  { book: "john", ch: 1, from: 6, to: 8, g: G_PAR, ref: "John the Baptist", note: "The Baptist’s ministry in the other gospels.", go: [["mark", 1, 4], ["matthew", 3, 1], ["luke", 3, 3]] },
  { book: "john", ch: 1, from: 14, to: 14, g: G_OT, ref: "Exodus 25:8", note: "“Dwelt” is related to the Greek word for tent or tabernacle." },
  { book: "john", ch: 1, from: 17, to: 17, g: G_OT, ref: "Exodus 20:1–17", note: "The giving of the law through Moses." },
  { book: "john", ch: 1, from: 18, to: 18, g: G_NT, ref: "1 John 4:12", note: "Also says no one has seen God." },
  { book: "john", ch: 1, from: 23, to: 23, g: G_PAR, ref: "Isaiah 40:3 in all four gospels", note: "Each gospel applies this verse to John the Baptist.", go: [["mark", 1, 2], ["matthew", 3, 3], ["luke", 3, 4]] },
  { book: "john", ch: 1, from: 32, to: 34, g: G_PAR, ref: "Baptism of Jesus", note: "Here the Baptist testifies to the Spirit descending, without narrating the baptism itself.", go: [["mark", 1, 9], ["matthew", 3, 13], ["luke", 3, 21]] },
  // Mark 1
  { book: "mark", ch: 1, from: 1, to: 1, g: G_LANG, ref: "“gospel” (Greek euangelion)", note: "Literally “good news.”" },
  { book: "mark", ch: 1, from: 1, to: 1, g: G_PAR, ref: "John 1:1", note: "Compare how John opens.", go: [["john", 1, 1]] },
  { book: "mark", ch: 1, from: 2, to: 3, g: G_OT, ref: "Malachi 3:1; Isaiah 40:3", note: "The two prophetic texts combined here." },
  { book: "mark", ch: 1, from: 2, to: 3, g: G_PAR, ref: "Isaiah 40:3 in all four gospels", note: "All four gospels cite the Isaiah passage.", go: [["matthew", 3, 3], ["luke", 3, 4], ["john", 1, 23]] },
  { book: "mark", ch: 1, from: 4, to: 8, g: G_PAR, ref: "John the Baptist", note: "The Baptist’s preaching and witness.", go: [["john", 1, 6], ["matthew", 3, 1], ["luke", 3, 3]] },
  { book: "mark", ch: 1, from: 9, to: 11, g: G_PAR, ref: "Baptism of Jesus", note: "John’s gospel gives the Baptist’s testimony about the Spirit rather than the baptism scene.", go: [["matthew", 3, 13], ["luke", 3, 21], ["john", 1, 32]] },
  { book: "mark", ch: 1, from: 11, to: 11, g: G_OT, ref: "Psalm 2:7; Isaiah 42:1", note: "Royal and servant imagery behind the voice." },
  { book: "mark", ch: 1, from: 12, to: 13, g: G_PAR, ref: "Temptation in the wilderness", note: "Matthew and Luke give fuller accounts.", go: [["matthew", 4, 1], ["luke", 4, 1]] },
  { book: "mark", ch: 1, from: 14, to: 15, g: G_PAR, ref: "Start of the Galilean ministry", note: "Compare the opening of Jesus’ preaching.", go: [["matthew", 4, 12], ["luke", 4, 14]] },
  // Matthew 5
  { book: "matthew", ch: 5, from: 1, to: 2, g: G_PAR, ref: "Luke 6:17–20", note: "Luke sets a parallel teaching on a level place.", go: [["luke", 6, 17]] },
  { book: "matthew", ch: 5, from: 3, to: 3, g: G_PAR, ref: "Luke 6:20", note: "“Blessed are ye poor,” in Luke’s wording.", go: [["luke", 6, 20]] },
  { book: "matthew", ch: 5, from: 3, to: 4, g: G_OT, ref: "Isaiah 61:1–2", note: "Good news to the poor; comfort for those who mourn." },
  { book: "matthew", ch: 5, from: 4, to: 6, g: G_PAR, ref: "Luke 6:21", note: "Hunger and weeping in Luke’s version.", go: [["luke", 6, 21]] },
  { book: "matthew", ch: 5, from: 5, to: 5, g: G_OT, ref: "Psalm 37:11", note: "“The meek shall inherit the earth.”" },
  { book: "matthew", ch: 5, from: 8, to: 8, g: G_OT, ref: "Psalm 24:3–4", note: "Clean hands and a pure heart." },
  { book: "matthew", ch: 5, from: 11, to: 12, g: G_PAR, ref: "Luke 6:22–23", note: "Blessing on those reviled.", go: [["luke", 6, 22]] },
  // Luke 2
  { book: "luke", ch: 2, from: 1, to: 7, g: G_PAR, ref: "Birth of Jesus in Matthew", note: "Matthew tells the birth from Joseph’s side.", go: [["matthew", 1, 18], ["matthew", 2, 1]] },
  { book: "luke", ch: 2, from: 4, to: 4, g: G_OT, ref: "Micah 5:2", note: "Bethlehem as the origin of a ruler." },
  { book: "luke", ch: 2, from: 8, to: 14, g: G_LANG, ref: "Unique to Luke", note: "The shepherds and angels appear only in Luke among the four gospels." },
  { book: "luke", ch: 2, from: 11, to: 11, g: G_OT, ref: "Isaiah 9:6", note: "A child born, a son given." },
  { book: "luke", ch: 2, from: 14, to: 14, g: G_NT, ref: "Luke 19:38", note: "Similar praise at the entry into Jerusalem.", go: [["luke", 19, 38]] }
];
