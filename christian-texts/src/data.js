export const P = {
  matthew: { name: "Matthew", ch: 5, title: "The Beatitudes", span: "1–12", verses: [
    "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:",
    "And he opened his mouth, and taught them, saying,",
    "Blessed are the poor in spirit: for theirs is the kingdom of heaven.",
    "Blessed are they that mourn: for they shall be comforted.",
    "Blessed are the meek: for they shall inherit the earth.",
    "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
    "Blessed are the merciful: for they shall obtain mercy.",
    "Blessed are the pure in heart: for they shall see God.",
    "Blessed are the peacemakers: for they shall be called the children of God.",
    "Blessed are they which are persecuted for righteousness’ sake: for theirs is the kingdom of heaven.",
    "Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake.",
    "Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you."
  ]},
  mark: { name: "Mark", ch: 1, title: "The beginning of the gospel", span: "1–15", verses: [
    "The beginning of the gospel of Jesus Christ, the Son of God;",
    "As it is written in the prophets, Behold, I send my messenger before thy face, which shall prepare thy way before thee.",
    "The voice of one crying in the wilderness, Prepare ye the way of the Lord, make his paths straight.",
    "John did baptize in the wilderness, and preach the baptism of repentance for the remission of sins.",
    "And there went out unto him all the land of Judaea, and they of Jerusalem, and were all baptized of him in the river of Jordan, confessing their sins.",
    "And John was clothed with camel’s hair, and with a girdle of a skin about his loins; and he did eat locusts and wild honey;",
    "And preached, saying, There cometh one mightier than I after me, the latchet of whose shoes I am not worthy to stoop down and unloose.",
    "I indeed have baptized you with water: but he shall baptize you with the Holy Ghost.",
    "And it came to pass in those days, that Jesus came from Nazareth of Galilee, and was baptized of John in Jordan.",
    "And straightway coming up out of the water, he saw the heavens opened, and the Spirit like a dove descending upon him:",
    "And there came a voice from heaven, saying, Thou art my beloved Son, in whom I am well pleased.",
    "And immediately the Spirit driveth him into the wilderness.",
    "And he was there in the wilderness forty days, tempted of Satan; and was with the wild beasts; and the angels ministered unto him.",
    "Now after that John was put in prison, Jesus came into Galilee, preaching the gospel of the kingdom of God,",
    "And saying, The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel."
  ]},
  luke: { name: "Luke", ch: 2, title: "The birth of Jesus", span: "1–14", verses: [
    "And it came to pass in those days, that there went out a decree from Caesar Augustus, that all the world should be taxed.",
    "(And this taxing was first made when Cyrenius was governor of Syria.)",
    "And all went to be taxed, every one into his own city.",
    "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem; (because he was of the house and lineage of David:)",
    "To be taxed with Mary his espoused wife, being great with child.",
    "And so it was, that, while they were there, the days were accomplished that she should be delivered.",
    "And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn.",
    "And there were in the same country shepherds abiding in the field, keeping watch over their flock by night.",
    "And, lo, the angel of the Lord came upon them, and the glory of the Lord shone round about them: and they were sore afraid.",
    "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people.",
    "For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
    "And this shall be a sign unto you; Ye shall find the babe wrapped in swaddling clothes, lying in a manger.",
    "And suddenly there was with the angel a multitude of the heavenly host praising God, and saying,",
    "Glory to God in the highest, and on earth peace, good will toward men."
  ]},
  john: { name: "John", ch: 1, title: "The Word made flesh", span: "1–18", verses: [
    "In the beginning was the Word, and the Word was with God, and the Word was God.",
    "The same was in the beginning with God.",
    "All things were made by him; and without him was not any thing made that was made.",
    "In him was life; and the life was the light of men.",
    "And the light shineth in darkness; and the darkness comprehended it not.",
    "There was a man sent from God, whose name was John.",
    "The same came for a witness, to bear witness of the Light, that all men through him might believe.",
    "He was not that Light, but was sent to bear witness of that Light.",
    "That was the true Light, which lighteth every man that cometh into the world.",
    "He was in the world, and the world was made by him, and the world knew him not.",
    "He came unto his own, and his own received him not.",
    "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:",
    "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.",
    "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
    "John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.",
    "And of his fulness have all we received, and grace for grace.",
    "For the law was given by Moses, but grace and truth came by Jesus Christ.",
    "No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him."
  ]}
};
export const ORDER = ["matthew", "mark", "luke", "john"];

/* Connections: g = group, ref = reference label, note = short explanation, go = [book, verse] if loaded here */
export const G_PAR = "Gospel parallels";
export const G_OT = "Old Testament";
export const G_NT = "Elsewhere in the New Testament";
export const G_LANG = "Language note";
export const C = {
  john: [
    { from: 1, to: 1, g: G_OT, ref: "Genesis 1:1", note: "Opens with the same words as the creation account." },
    { from: 1, to: 1, g: G_LANG, ref: "“Word” (Greek logos)", note: "Can mean word, reason, or message; here it names a divine agent present at creation." },
    { from: 1, to: 5, g: G_OT, ref: "Genesis 1:3–5", note: "Light and darkness echo the first day of creation." },
    { from: 1, to: 1, g: G_NT, ref: "1 John 1:1", note: "Another opening that begins “from the beginning.”" },
    { from: 6, to: 8, g: G_PAR, ref: "Mark 1:4", note: "John the Baptist’s ministry.", go: ["mark", 4] },
    { from: 6, to: 8, g: G_PAR, ref: "Matthew 3:1; Luke 3:3", note: "Same figure, introduced differently.", tag: "not loaded" },
    { from: 14, to: 14, g: G_OT, ref: "Exodus 25:8", note: "“Dwelt” is related to the Greek word for tent or tabernacle." },
    { from: 17, to: 17, g: G_OT, ref: "Exodus 20:1–17", note: "The giving of the law through Moses." },
    { from: 18, to: 18, g: G_NT, ref: "1 John 4:12", note: "Also says no one has seen God." }
  ],
  mark: [
    { from: 1, to: 1, g: G_LANG, ref: "“gospel” (Greek euangelion)", note: "Literally “good news.”" },
    { from: 1, to: 1, g: G_PAR, ref: "John 1:1", note: "Compare how John opens.", go: ["john", 1] },
    { from: 2, to: 3, g: G_OT, ref: "Malachi 3:1; Isaiah 40:3", note: "The two prophetic texts combined here." },
    { from: 2, to: 3, g: G_PAR, ref: "Matthew 3:3; Luke 3:4–6; John 1:23", note: "All four gospels cite the Isaiah passage.", tag: "partly loaded" },
    { from: 4, to: 8, g: G_PAR, ref: "John 1:6–8", note: "John the Baptist as witness.", go: ["john", 6] },
    { from: 4, to: 8, g: G_PAR, ref: "Matthew 3:1–12; Luke 3:1–18", note: "The Baptist’s preaching.", tag: "not loaded" },
    { from: 9, to: 11, g: G_PAR, ref: "Matthew 3:13–17; Luke 3:21–22; John 1:32–34", note: "The baptism of Jesus.", tag: "not loaded" },
    { from: 11, to: 11, g: G_OT, ref: "Psalm 2:7; Isaiah 42:1", note: "Royal and servant imagery behind the voice." },
    { from: 12, to: 13, g: G_PAR, ref: "Matthew 4:1–11; Luke 4:1–13", note: "Fuller accounts of the temptation.", tag: "not loaded" },
    { from: 14, to: 15, g: G_PAR, ref: "Matthew 4:12–17; Luke 4:14–15", note: "Start of the Galilean ministry.", tag: "not loaded" }
  ],
  matthew: [
    { from: 1, to: 2, g: G_PAR, ref: "Luke 6:17–20", note: "Luke sets a parallel teaching on a level place.", tag: "not loaded" },
    { from: 3, to: 3, g: G_PAR, ref: "Luke 6:20", note: "“Blessed are ye poor,” in Luke’s wording.", tag: "not loaded" },
    { from: 3, to: 4, g: G_OT, ref: "Isaiah 61:1–2", note: "Good news to the poor; comfort for those who mourn." },
    { from: 4, to: 6, g: G_PAR, ref: "Luke 6:21", note: "Hunger and weeping in Luke’s version.", tag: "not loaded" },
    { from: 5, to: 5, g: G_OT, ref: "Psalm 37:11", note: "“The meek shall inherit the earth.”" },
    { from: 8, to: 8, g: G_OT, ref: "Psalm 24:3–4", note: "Clean hands and a pure heart." },
    { from: 11, to: 12, g: G_PAR, ref: "Luke 6:22–23", note: "Blessing on those reviled.", tag: "not loaded" }
  ],
  luke: [
    { from: 1, to: 7, g: G_PAR, ref: "Matthew 1:18–25; 2:1", note: "Matthew tells the birth from Joseph’s side.", tag: "not loaded" },
    { from: 4, to: 4, g: G_OT, ref: "Micah 5:2", note: "Bethlehem as the origin of a ruler." },
    { from: 8, to: 14, g: G_LANG, ref: "Unique to Luke", note: "The shepherds and angels appear only in Luke among the four gospels." },
    { from: 11, to: 11, g: G_OT, ref: "Isaiah 9:6", note: "A child born, a son given." },
    { from: 14, to: 14, g: G_NT, ref: "Luke 19:38", note: "Similar praise at the entry into Jerusalem." }
  ]
};

