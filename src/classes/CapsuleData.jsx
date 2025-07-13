export class CapsuleData {

    constructor(id, userName, userImg, capName, videos, imgs, texts){
        this.id = id
        this.userName = userName
        this.userImg = userImg
        this.capName = capName
        this.videos = videos
        this.imgs = imgs
        this.texts = texts
    }

    getDisplayData() {
        return {"id" : this.id, 
                "userName" : this.userName,
                "userImg" : this.userImg,
                "capName" : this.capName,
                "videoCount" : this.videos.length,
                "imgCount" : this.imgs.length,
                "textCount" : this.texts.length}
    }
}


export const dummyData = [
  {
    "id": 1,
    "userName": "AliceW",
    "userImg": "https://randomuser.me/api/portraits/women/1.jpg",
    "capName": "Summer Memories",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4"
    ],
    "imgs": Array.from({length: 15}, (_,i)=>`https://picsum.photos/id/${i+10}/200/300`),
    "texts": [
      "The best way to get started is to quit talking and begin doing.",
      "Life is what happens when you're busy making other plans.",
      "Keep smiling, because life is a beautiful thing and there's so much to smile about.",
      "The purpose of our lives is to be happy.",
      "Get busy living or get busy dying.",
      "You have within you right now, everything you need to deal with whatever the world can throw at you.",
      "Believe you can and you're halfway there."
    ]
  },
  {
    "id": 2,
    "userName": "BobJ",
    "userImg": "https://randomuser.me/api/portraits/men/2.jpg",
    "capName": "Road Trip",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
      "https://samplelib.com/mp4/sample-5s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_960x400_ocean_wave.mp4"
    ],
    "imgs": Array.from({length: 10}, (_,i)=>`https://picsum.photos/id/${i+30}/200/300`),
    "texts": [
      "Success is not in what you have, but who you are.",
      "The only impossible journey is the one you never begin.",
      "In the end, we only regret the chances we didn't take.",
      "Happiness is not something ready made. It comes from your own actions."
    ]
  },
  {
    "id": 3,
    "userName": "CindyM",
    "userImg": "https://randomuser.me/api/portraits/women/3.jpg",
    "capName": "Holiday Fun",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4"
    ],
    "imgs": Array.from({length: 12}, (_,i)=>`https://picsum.photos/id/${i+50}/200/300`),
    "texts": [
      "The journey of a thousand miles begins with one step.",
      "Dream big and dare to fail.",
      "What we think, we become.",
      "The mind is everything. What you think you become.",
      "Turn your wounds into wisdom.",
      "Change the world by being yourself."
    ]
  },
  {
    "id": 4,
    "userName": "DavidP",
    "userImg": "https://randomuser.me/api/portraits/men/4.jpg",
    "capName": "Family Time",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
      "https://samplelib.com/mp4/sample-5s.mp4"
    ],
    "imgs": Array.from({length: 20}, (_,i)=>`https://picsum.photos/id/${i+70}/200/300`),
    "texts": [
      "Every moment is a fresh beginning.",
      "Never regret anything that made you smile.",
      "Die with memories, not dreams.",
      "Aspire to inspire before we expire.",
      "Everything you can imagine is real.",
      "Simplicity is the ultimate sophistication.",
      "Whatever you do, do it well.",
      "What we think, we become.",
      "All limitations are self-imposed.",
      "Tough times never last but tough people do."
    ]
  },
  {
    "id": 5,
    "userName": "EmmaR",
    "userImg": "https://randomuser.me/api/portraits/women/5.jpg",
    "capName": "Beach Days",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4"
    ],
    "imgs": Array.from({length: 8}, (_,i)=>`https://picsum.photos/id/${i+90}/200/300`),
    "texts": [
      "Be so good they can't ignore you.",
      "Whatever you are, be a good one.",
      "Strive for greatness."
    ]
  },
  {
    "id": 6,
    "userName": "FrankS",
    "userImg": "https://randomuser.me/api/portraits/men/6.jpg",
    "capName": "Mountain Hikes",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
      "https://samplelib.com/mp4/sample-5s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_960x400_ocean_wave.mp4",
      "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing.mp4"
    ],
    "imgs": Array.from({length: 25}, (_,i)=>`https://picsum.photos/id/${i+110}/200/300`),
    "texts": [
      "Do what you can with all you have, wherever you are.",
      "What consumes your mind controls your life.",
      "Opportunities don't happen, you create them.",
      "Sometimes later becomes never. Do it now.",
      "Great things never come from comfort zones.",
      "Dream it. Wish it. Do it.",
      "Success doesn't just find you. You have to go out and get it.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Don't stop when you're tired. Stop when you're done.",
      "Wake up with determination. Go to bed with satisfaction.",
      "Little things make big days.",
      "It's going to be hard, but hard does not mean impossible."
    ]
  },
  {
    "id": 7,
    "userName": "GraceT",
    "userImg": "https://randomuser.me/api/portraits/women/7.jpg",
    "capName": "City Life",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4"
    ],
    "imgs": Array.from({length: 14}, (_,i)=>`https://picsum.photos/id/${i+140}/200/300`),
    "texts": [
      "Push yourself, because no one else is going to do it for you.",
      "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
      "The key to success is to focus on goals, not obstacles.",
      "Dream bigger. Do bigger.",
      "Don't watch the clock; do what it does. Keep going.",
      "Great things never come from comfort zones.",
      "Success is what happens after you have survived all your mistakes.",
      "The harder you work for something, the greater you'll feel when you achieve it."
    ]
  },
  {
    "id": 8,
    "userName": "HenryV",
    "userImg": "https://randomuser.me/api/portraits/men/8.jpg",
    "capName": "Concert Nights",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
      "https://samplelib.com/mp4/sample-5s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_960x400_ocean_wave.mp4",
      "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing.mp4",
      "https://samplelib.com/mp4/sample-30s.mp4"
    ],
    "imgs": Array.from({length: 30}, (_,i)=>`https://picsum.photos/id/${i+160}/200/300`),
    "texts": [
      "Don't wait for opportunity. Create it.",
      "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
      "The key to success is to focus on goals, not obstacles.",
      "Dream bigger. Do bigger.",
      "Don't watch the clock; do what it does. Keep going.",
      "Great things never come from comfort zones.",
      "Success is what happens after you have survived all your mistakes.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Push yourself, because no one else is going to do it for you."
    ]
  },
  {
    "id": 9,
    "userName": "IslaW",
    "userImg": "https://randomuser.me/api/portraits/women/9.jpg",
    "capName": "Winter Wonderland",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4"
    ],
    "imgs": Array.from({length: 18}, (_,i)=>`https://picsum.photos/id/${i+190}/200/300`),
    "texts": [
      "If you can dream it, you can do it.",
      "Don't let yesterday take up too much of today.",
      "It's not whether you get knocked down, it's whether you get up.",
      "If you are not willing to risk the usual, you will have to settle for the ordinary.",
      "The only limit to our realization of tomorrow will be our doubts of today."
    ]
  },
  {
    "id": 10,
    "userName": "JackX",
    "userImg": "https://randomuser.me/api/portraits/men/10.jpg",
    "capName": "Food Adventures",
    "videos": [
      "https://samplelib.com/mp4/sample-720p.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
      "https://samplelib.com/mp4/sample-5s.mp4"
    ],
    "imgs": Array.from({length: 22}, (_,i)=>`https://picsum.photos/id/${i+210}/200/300`),
    "texts": [
      "The only way to do great work is to love what you do.",
      "Difficult roads often lead to beautiful destinations.",
      "Don't watch the clock; do what it does. Keep going.",
      "Great things never come from comfort zones.",
      "Success is what happens after you have survived all your mistakes.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Push yourself, because no one else is going to do it for you.",
      "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
      "The key to success is to focus on goals, not obstacles.",
      "Dream bigger. Do bigger.",
      "Don't wait for opportunity. Create it."
    ]
  }
]

export function CapsuleListFromJson(data) {
    return data.map(
        item => new CapsuleData(item.id, item.userName, item.userImg, item.capName, item.videos, item.imgs, item.texts)
    )
}