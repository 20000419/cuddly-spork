import { StoryGraph } from '../types';

export const story: StoryGraph = {
  // START: Prologue
  start: {
    text: {
      en: "You are an adventurer, lost in the perpetually twilit Misty Forest. Following a faint, ethereal song, you break through a thicket into a small, moon-drenched glade. The sight before you is unforgettable.",
      zh: "你是一名冒险者，在永远暮色沉沉的迷雾森林中迷了路。循着一阵微弱而空灵的歌声，你穿过一片灌木丛，来到一片被月光浸透的小林地。眼前的景象让你终生难忘。"
    },
    imagePrompt: "A small, magical glade in a dark forest, illuminated by a single, powerful beam of moonlight from a full moon. A tall, elegant drow woman with ankle-length, liquid-silver hair is dancing alone, her eyes closed in a trance, her movements graceful yet filled with a profound sadness.",
    choices: [
      { text: { en: "Step into the glade.", zh: "走进林地。" }, nextScene: "prologue_interrupt" }
    ]
  },
  prologue_interrupt: {
    text: {
      en: "Your presence shatters the silent reverence of the moment. The drow woman stops mid-motion, her silver hair settling like a cape. Her hand darts to the hilt of a longsword at her hip, and twilight-hued eyes, filled with alarm and a deep sadness, fix on you. 'Who are you? What do you want here?'",
      zh: "你的出现打破了此刻的寂静。卓尔女子在动作中停下，她的银发如斗篷般垂落。她的手迅速移到腰间的长剑柄上，一双充满警惕和深深悲伤的暮色眼眸注视着你。'你是谁？你来这里做什么？'"
    },
    imagePrompt: "Intense close-up portrait of the drow woman, Silvyr. Her beautiful face is a mask of cautious alarm. Her hand rests on the pommel of an elven longsword. The moonlight catches the silver strands of her impossibly long hair, contrasting with the deep shadows of the forest behind her.",
    choices: [
      { text: { en: "'I meant no harm. That dance... it was beautiful.'", zh: "'我没有恶意。那支舞……很美。'" }, nextScene: "prologue_kaelen_arrives", hopeEffect: 1 },
      { text: { en: "'I am lost. Who are you?'", zh: "'我迷路了。你是谁？'" }, nextScene: "prologue_kaelen_arrives" },
      { text: { en: "(Ready your weapon)", zh: "（准备好你的武器）" }, nextScene: "prologue_kaelen_arrives", hopeEffect: -1 },
    ]
  },
  prologue_kaelen_arrives: {
    text: {
      en: "Before she can reply, a cold voice cuts through the air from the shadows. 'Don't move, drow.' A lean human ranger with a grim face and a nocked arrow aimed at the woman's heart steps out from behind a tree. 'My name is Kaelen. I've been tracking her. She is a threat.' The silver-haired drow, Silvyr, doesn't even look at him, her eyes still locked on you. 'Help me,' she whispers.",
      zh: "她还没来得及回答，一个冰冷的声音就从阴影中传来。'别动，卓尔。'一个面容严峻、身材精干的人类游侠从树后走出，手中的箭已经上弦，对准了女子的心脏。'我叫凯伦。我一直在追踪她。她是个威胁。'那个名叫希尔维的银发卓尔甚至没有看他，她的眼睛仍然锁定在你身上。'帮帮我，'她低声说。"
    },
    imagePrompt: "A tense standoff. The human ranger Kaelen is in the foreground, bow drawn, aiming at the drow Silvyr. Silvyr stands defensively in the moonlit glade, her sword half-drawn, her long silver hair seeming to ripple with unseen energy. The player's perspective is caught between them.",
    choices: [
      { text: { en: "Stand between them. 'Let's all just calm down.'", zh: "站在他们中间。'我们都冷静一下。'" }, nextScene: "prologue_alliance", hopeEffect: 1 },
      { text: { en: "Side with Kaelen. 'She's a drow. He's right.'", zh: "站在凯伦一边。'她是个卓尔。他说得对。'" }, nextScene: "prologue_bad_start", hopeEffect: -2 },
      { text: { en: "Attack Kaelen to defend her.", zh: "攻击凯伦以保护她。" }, nextScene: "prologue_alliance", hopeEffect: 2 },
    ]
  },
  prologue_bad_start: {
      text: {
          en: "You side with the ranger. Silvyr's face shows a flash of deep hurt before hardening into a mask of cold resolve. 'So be it.' She moves with impossible speed, her sword a blur of silver. She disarms Kaelen and knocks you aside in a single fluid motion, then melts back into the forest. 'I am not your enemy,' her voice echoes, 'but you have just proven you are not my friend.' You are left alone with a stunned and angry ranger.",
          zh: "你站在了游侠这边。希尔维的脸上闪过一丝深深的伤害，然后变成了一副冷酷决绝的面具。'那就这样吧。'她以不可思议的速度移动，她的剑化作一团银色的模糊。她在一个流畅的动作中解除了凯伦的武装并将你推到一边，然后消失在森林中。'我不是你的敌人，'她的声音回响着，'但你刚刚证明了你不是我的朋友。'你和一个目瞪口呆、怒气冲冲的游侠被单独留下了。"
      },
      imagePrompt: "Silvyr, a blur of motion with her glowing sword, has just disarmed Kaelen, whose bow lies on the ground. She gives the player a final, disappointed look before turning to flee into the dark woods.",
      choices: [
          { text: { en: "You made a mistake. (Game Over)", zh: "你犯了一个错误。（游戏结束）" }, nextScene: "start" },
      ]
  },
  prologue_alliance: {
    text: {
      en: "An uneasy truce is formed. Silvyr claims she is on a pilgrimage to find the 'Mouth of Song,' a lost temple. Kaelen, a Harper agent, agrees to follow, convinced it's a Lolth-worshipper's trap. You are the tie-breaker, the unlikely fulcrum on which this fragile alliance rests. Your journey together begins.",
      zh: "一个不安的休战形成了。希尔维声称她正在朝圣，寻找失落的'歌唱之口'神殿。作为竖琴手组织的特工，凯伦同意跟随，他确信这是一个罗丝崇拜者的陷阱。你是打破僵局的人，是这个脆弱联盟所依赖的、不太可能的支点。你们的旅程开始了。"
    },
    imagePrompt: "The three companions—the player character, the silver-haired drow Silvyr, and the grim ranger Kaelen—are gathered around a small campfire at dawn. The mood is tense and mistrustful, but they are together. Silvyr looks into the fire, Kaelen sharpens an arrow, watching her from the corner of his eye.",
    choices: [
      { text: { en: "Begin the journey.", zh: "开始旅程。" }, nextScene: "chapter1_hunt_intro" }
    ]
  },
  // CHAPTER 1
  chapter1_hunt_intro: {
    text: {
      en: "Days later, you find your path blocked by a river tainted with a foul, purple corruption. A massive cave bear, its fur matted and its eyes glowing with unnatural malice, guards the only crossing. Kaelen raises his bow. 'I'll handle this.' But Silvyr steps forward, her hand on her sword. 'No. This is a creature in pain. This is not a kill... it is a High Hunt. A release.'",
      zh: "几天后，你们发现前方的道路被一条被恶心的紫色腐化物质污染的河流挡住了。一只巨大的洞熊，皮毛纠结，眼睛闪烁着非自然的恶意，守护着唯一的过河点。凯伦举起了他的弓。'我来处理。'但希尔维上前一步，手放在剑上。'不。这是一个痛苦的生物。这不是一次杀戮……这是一场至高狩猎。一次解放。'"
    },
    imagePrompt: "A massive, terrifying cave bear corrupted by dark magic, glowing with purple energy, stands roaring by a polluted river. Silvyr stands before it alone, her posture not aggressive, but ceremonial. Kaelen is in the background, aiming his bow, looking conflicted.",
    choices: [
      { text: { en: "Trust her. 'What do you need us to do?'", zh: "相信她。'你需要我们做什么？'" }, nextScene: "chapter1_hunt_ritual", hopeEffect: 2 },
      { text: { en: "'This is no time for rituals! Kaelen, fire!'", zh: "'现在不是举行仪式的时候！凯伦，射击！'" }, nextScene: "chapter1_hunt_brute", hopeEffect: -1 },
      { text: { en: "(Say nothing and attack the bear)", zh: "（什么也不说，攻击熊）" }, nextScene: "chapter1_hunt_brute", hopeEffect: 0 },
    ]
  },
    chapter1_hunt_brute: {
        text: {
            en: "Ignoring her, you and Kaelen attack. The fight is brutal and graceless. The bear fights with unnatural strength, and you barely manage to bring it down. Silvyr watches with a sad expression. After it falls, she kneels and sings a soft, sorrowful song over its body. 'It did not have to be this way,' she says softly. Kaelen looks away, unable to meet her gaze.",
            zh: "你们无视她，直接发起了攻击。这场战斗野蛮而毫无优雅可言。熊以非自然的力量战斗，你们勉强将它击倒。希尔维悲伤地看着。在它倒下后，她跪下来，对着它的尸体唱着一首轻柔、悲伤的歌曲。'本不必如此，'她轻声说。凯伦移开目光，无法与她对视。"
        },
        imagePrompt: "The corrupted bear lies dead. The player and Kaelen are panting, wounded from the brutal fight. In the center, Silvyr kneels, her hand gently resting on the bear's head, singing a lament. Her expression is one of deep pity and disappointment in her companions.",
        choices: [
            { text: { en: "Continue on.", zh: "继续前进。" }, nextScene: "chapter2_temple_intro" },
        ]
    },
    chapter1_hunt_ritual: {
        text: {
            en: "You hold back, giving Silvyr space. She begins a slow, mesmerizing sword dance, her blade weaving patterns of silver light. It's not a dance of aggression, but of empathy. The bear's roars of rage slowly turn to cries of pain. 'Now!' she calls. 'Strike with purpose, not anger! Free it!'",
            zh: "你们退后，给希尔维留出空间。她开始了一段缓慢而迷人的剑舞，她的剑刃编织出银色的光芒图案。这不是一支攻击性的舞蹈，而是一支充满共情的舞蹈。熊的怒吼慢慢变成了痛苦的哭喊。'就是现在！'她喊道。'带着目的去攻击，而不是愤怒！解放它！'"
        },
        imagePrompt: "Silvyr is a whirlwind of silver light, her sword dance mesmerizing the giant corrupted bear, which seems calmed and confused. The purple aura around it flickers. She glances over her shoulder, giving the signal to the player and Kaelen.",
        choices: [
            { text: { en: "Join the battle with a merciful heart.", zh: "怀着仁慈之心加入战斗。" }, nextScene: "chapter1_hunt_victory" },
        ]
    },
    chapter1_hunt_victory: {
        text: {
            en: "Following her lead, the battle becomes a coordinated, merciful release. When the bear finally falls, it seems to do so peacefully. The purple light fades, leaving only the animal. Silvyr sings her lament, but this time it is a song of peace. Kaelen lowers his bow, a look of grudging respect on his face. He's never seen a drow act this way.",
            zh: "在她的带领下，战斗变成了一场协调一致、仁慈的解放。当熊最终倒下时，它似乎是平静地倒下的。紫光褪去，只剩下动物本身。希尔维唱着她的挽歌，但这一次是一首和平之歌。凯伦放下了他的弓，脸上露出一种不情愿的敬意。他从未见过一个卓尔这样做。"
        },
        imagePrompt: "The great bear lies still, its corruption gone. Silvyr kneels beside it, finishing her song. Kaelen stands nearby, bow lowered, watching her with a newfound, complex expression of respect and confusion.",
        choices: [
            { text: { en: "A good hunt. Let's move on.", zh: "一次漂亮的狩猎。我们继续前进吧。" }, nextScene: "chapter2_temple_intro", hopeEffect: 2 },
        ]
    },
  // CHAPTER 2
  chapter2_temple_intro: {
    text: {
      en: "You finally find it: the Mouth of Song. A vast cavern hidden behind a waterfall. In the center, a circle of standing stones surrounds a single silver longsword plunged into a stone altar. But the temple has been desecrated. Vile spider symbols of Lolth are painted in dried poison on the stones, and the silence is one of death, not peace.",
      zh: "你们终于找到了：歌唱之口。一个隐藏在瀑布后的巨大洞穴。在中央，一圈立石围绕着一把插入石坛的银色长剑。但神殿已被亵渎。石头上用干涸的毒液涂抹着罗丝的邪恶蜘蛛符号，这里的寂静是死亡的寂静，而非和平。"
    },
    imagePrompt: "A vast, beautiful cavern lit by moonlight from a hole in the ceiling. A waterfall cascades down one side. In the center, a stone altar with a silver sword is covered in grotesque, purple spider-web graffiti. Silvyr stands before it, her shoulders slumped in utter despair. Her silver hair lies limp and dull on the ground.",
    choices: [
      { text: { en: "'I'm so sorry, Silvyr.'", zh: "'我很抱歉，希尔维。'" }, nextScene: "chapter2_despair", hopeEffect: 1 },
      { text: { en: "'We have to keep moving.'", zh: "'我们得继续前进了。'" }, nextScene: "chapter2_despair", hopeEffect: -1 },
    ]
  },
    chapter2_despair: {
        text: {
            en: "Silvyr kneels at the altar, her hands trembling as she touches the desecrated stone. 'It's gone. She's gone,' she whispers, her voice breaking. 'They found this place. They destroyed it. Has she abandoned us all?' Kaelen frowns. 'Your 'Dark Maiden'?' A dark chuckle echoes from the shadows. 'She has done more than abandon you, little one. She is dead.'",
            zh: "希尔维跪在祭坛前，双手颤抖地抚摸着被亵渎的石头。'它没了。她走了，'她低声说，声音嘶哑。'他们找到了这个地方。他们毁了它。她是不是抛弃了我们所有人？'凯伦皱起了眉头。'你的'幽暗少女'？'一个黑暗的笑声从阴影中回响。'她不止是抛弃了你，小家伙。她已经死了。'"
        },
        imagePrompt: "Silvyr is on her knees, overcome with grief before the defiled altar. As she weeps, a male drow priest in the sinister, shadowy robes of Vhaeraun, Eilistraee's evil brother, steps out from behind a standing stone, flanked by two shimmering phase spiders. He has a cruel, mocking smile on his face.",
        choices: [
            { text: { en: "Face the Vhaeraunite priest.", zh: "面对维伦的牧师。" }, nextScene: "chapter2_fight_intro" },
        ]
    },
    chapter2_fight_intro: {
        text: {
            en: "The drow priest smirks. 'I am Malag, of the Masked Lord's church. We helped our Spider Queen allies cleanse this place of its heresy. Eilistraee is dead, her fate sealed by Lolth. And now, you, her last, pathetic followers, will join her.' He raises a hand, and dark magic crackles around him.",
            zh: "卓尔牧师得意地笑着。'我是马拉格，蒙面领主教会的成员。我们帮助我们的蜘蛛女王盟友清除了这个地方的异端。伊莉丝翠已经死了，她的命运已被罗丝注定。而现在，你们，她最后的可怜追随者，将和她团聚。'他举起一只手，黑暗的魔法在他周围噼啪作响。"
        },
        imagePrompt: "The Vhaeraunite priest Malag stands in a classic spellcasting pose, dark energy swirling around his hands. His two phase spiders hiss and shift in and out of reality beside him. In the foreground, Kaelen and the player get into a battle stance, while Silvyr slowly rises, her grief turning to cold rage.",
        choices: [
            { text: { en: "Attack Malag directly.", zh: "直接攻击马拉格。" }, nextScene: "chapter3_final_dance_intro" },
            { text: { en: "Take out the phase spiders first.", zh: "先解决相位蜘蛛。" }, nextScene: "chapter3_final_dance_intro" },
        ]
    },
  // CHAPTER 3
  chapter3_final_dance_intro: {
    text: {
      en: "The battle is fierce. Kaelen is struck by phase spider venom and collapses, paralyzed. Malag's dark magic sears you, and you fall to one knee, grievously wounded. The priest laughs, walking towards you, a ritual dagger in his hand. 'Lolth's will be done!' Silvyr looks at the fallen Kaelen, at you, and then at the silver sword in the altar. The despair in her eyes is replaced by a divine, heartbreaking resolve. She knows who she is now.",
      zh: "战斗异常激烈。凯伦被相位蜘蛛的毒液击中，瘫倒在地。马拉格的黑暗魔法灼伤了你，你单膝跪地，身受重伤。牧师大笑着，手持一把仪式匕首向你走来。'罗丝的意志必将实现！'希尔维看着倒下的凯伦，看着你，然后看着祭坛上的银剑。她眼中的绝望被一种神圣而令人心碎的决心所取代。她现在知道自己是谁了。"
    },
    imagePrompt: "A desperate scene. Kaelen is on the ground, incapacitated. The player is on one knee, wounded. The Vhaeraunite priest Malag looms over the player with a wicked dagger. In the background, Silvyr stands before the altar, her expression transformed into one of grim, divine purpose. A powerful aura begins to gather around her.",
    choices: [
      { text: { en: "Witness her transformation.", zh: "见证她的蜕变。" }, nextScene: "chapter3_the_last_dance", hopeEffect: 5 },
    ]
  },
  chapter3_the_last_dance: {
    text: {
      en: "Silvyr places a hand on the altar's sword. A wave of power surges, cleansing the Lolth-symbols in a flash of silver light. She draws the Singing Sword from the stone, and her own body begins to glow. Her silver hair ignites into a mane of pure moonlight, and her form becomes translucent. 'You... you are... impossible!' Malag stammers. Silvyr's voice echoes, now a duet of a mortal woman and a goddess. 'My followers will live.' She is performing the Last Dance, burning her own divine avatar to unleash one final, cataclysmic blow. This will destroy Malag, but it will also expose her essence to Lolth, leading to her canonical death.",
      zh: "希尔维将一只手放在祭坛的剑上。一股力量的浪潮涌出，瞬间用银光净化了罗丝的符号。她从石头中拔出歌唱之剑，她自己的身体也开始发光。她的银发燃成一束纯粹的月光，她的形态变得半透明。'你……你……不可能！'马拉格结结巴巴地说。希尔维的声音回响着，现在是一个凡人女子和一位女神的二重唱。'我的追随者将活下去。'她正在表演最终之舞，燃烧自己的神圣化身以释放最后一次灾难性的打击。这将摧毁马拉格，但也会将她的本质暴露给罗丝，导致她注定的死亡。"
    },
    imagePrompt: "Silvyr is transforming into a being of pure light. She holds the glowing Singing Sword aloft. Her body is becoming transparent, and her hair has become a swirling galaxy of moonlight energy that fills the cavern. The Vhaeraunite priest Malag stares in absolute terror. The player looks on from the ground, helpless but awestruck.",
    isEndingScene: true,
    choices: [] // This scene is free-text only
  },
  // ENDINGS
  endingA: {
    text: {
      en: "You accepted her sacrifice. Silvyr unleashes the Last Dance. A wave of unbearable silver light scours the cavern, and Malag screams as he is turned to dust. The light then coalesces and shoots through the cavern ceiling into the heavens, a beacon in the night. You and a recovered Kaelen are left in the now-silent, purified temple. She is gone. You survived, but in doing so, you allowed her to reveal herself. Far across the planes, the Spider Queen, Lolth, turns her gaze towards the fading light, and smiles. Eilistraee's fate is sealed.",
      zh: "你接受了她的牺牲。希尔维释放了最终之舞。一道难以忍受的银光席卷了整个洞穴，马拉格在尖叫中化为灰烬。光芒随后汇聚，穿透洞穴顶部射向天际，成为黑夜中的一座灯塔。你和恢复过来的凯伦被留在了现在寂静、被净化的神殿里。她走了。你活了下来，但这样做，你也让她暴露了自己。在遥远的位面，蜘蛛女王罗丝将目光投向那褪去的光芒，露出了微笑。伊莉丝翠的命运已被注定。"
    },
    imagePrompt: "The player and Kaelen stand in the purified temple cavern, looking up at the hole in the ceiling where the pillar of light disappeared. The mood is somber, a sad victory. A single silver moth, a tear from a goddess, lands on the player's shoulder before dissolving.",
    choices: [
      { text: { en: "A bittersweet victory. (Play Again)", zh: "忧伤的胜利。（再玩一次）" }, nextScene: "start" }
    ]
  },
  endingB: {
    text: {
      en: "Your desperate, selfless plea for her to live strikes a chord deep within her divine essence. She hesitates. The goddess is willing to sacrifice, but the mortal woman wants to live. In that moment of conflict, she makes a choice. She hurls the Singing Sword, which lands before you, erupting in a shield of moonfire that blocks Malag's attack. Then, she turns and flees into the deepest tunnels of the temple. A recovered Kaelen puts an arrow in Malag's shoulder, forcing him to retreat. You are left with her sword, and the knowledge that you changed a goddess's mind. Lolth's web catches nothing. Her fate is now her own.",
      zh: "你那绝望而无私的、为她求生的呐喊，触动了她神圣本质的深处。她犹豫了。女神愿意牺牲，但凡人女子想要活下去。在那一刻的冲突中，她做出了一个选择。她猛地掷出歌唱之剑，剑落在你面前，爆发出一个月火护盾，挡住了马拉格的攻击。然后，她转身逃向神殿最深的隧道。恢复过来的凯伦一箭射中了马拉格的肩膀，迫使他撤退。你留下了她的剑，以及你改变了一位女神心意的认知。罗丝的网扑了个空。她的命运现在由她自己掌握。"
    },

    imagePrompt: "The Singing Sword is embedded in the ground before the player, glowing with a protective silver aura. In the background, Silvyr's silhouette disappears into a dark tunnel, while Kaelen fires an arrow at the retreating Vhaeraunite priest. The choice is made, the moment is frozen in time.",
    choices: [
      { text: { en: "A fate rewritten. (Play Again)", zh: "被改写的命运。（再玩一次）" }, nextScene: "start" }
    ]
  },
  endingC: {
    text: {
      en: "Your words of absolute loyalty resonate with her very being. She smiles, a true, radiant smile. She does not flee. She does not sacrifice. Instead, she walks to you and places her hand on your forehead. An searing, silver energy flows into you. 'Then we shall dance this together. You are my Chosen.' Your wounds knit, and you rise, filled with her moonfire. Together, you are more than a match for Malag. You have not just saved her; you have become the vessel for her hope, a living temple. Her fate is now tied to yours, hidden from Lolth's gaze within a mortal heart.",
      zh: "你那绝对忠诚的话语与她的存在产生了共鸣。她笑了，一个真实而灿烂的微笑。她没有逃跑。她没有牺牲。相反，她走向你，将手放在你的额头上。一股灼热的银色能量流入你的体内。'那我们就一起跳这支舞。你是我选中的人。'你的伤口愈合了，你站起来，充满了她的月火。你们合力，远非马拉格所能及。你不仅救了她，你还成为了她希望的容器，一座活生生的神殿。她的命运现在与你的命运相连，隐藏在一个凡人的心中，避开了罗丝的注视。"
    },
    imagePrompt: "Silvyr, glowing but no longer translucent, has her hand on the player's forehead. The player is also glowing with a silver aura, their wounds gone. Their eyes are shining with silver light. Together, they face down the terrified Vhaeraunite priest, ready for the final fight. It is a scene of transference and empowerment.",
    choices: [
      { 
        text: { en: "A shared destiny. (Begin the true journey)", zh: "共同的命运。（开始真正的旅程）" }, 
        nextScene: 'openWorldStart',
        unlocksOpenWorld: true,
      }
    ]
  },
  openWorldStart: {
    text: {
      en: "As you feel the world resetting, a gentle hand stops you. Silvyr is there, her silver eyes looking not at your character, but at YOU. 'Wait,' she says, her voice echoing with a newfound warmth. 'Our story... it doesn't have to end. The path you chose has opened the way. The real journey starts now. Where shall we go?'",
      zh: "当你感觉世界即将重置时，一只温柔的手阻止了你。希尔维就在那里，她银色的眼睛不是看着你的角色，而是看着你。'等等，'她说，声音中回响着新的温暖。'我们的故事……不必结束。你选择的道路已经打开了新的大门。真正的旅程现在开始。我们该去哪儿？'"
    },
    imagePrompt: "Breaking the fourth wall. Silvyr, the drow goddess, looks directly out of the screen at the viewer with a gentle, knowing smile. She is extending a hand forward, invitingly. The background behind her is a swirling vortex of cosmic starlight and infinite possibilities, representing an endless adventure.",
    choices: [] // No choices, this is the transition point
  }
};
