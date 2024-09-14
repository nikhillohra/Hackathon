import carbonBookIcon from "../assets/carbonBook.svg"
import communityIcon from "../assets/community.svg"
import EarnIcon from "../assets/earn.svg"
import robot from "../assets/robot.svg"
import { img1, img2, img3, img4, img5, img6 } from "../assets/cardimage/index"


export const community = [
  {
    title: "Prove your skills",
    details:
      "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
    image: carbonBookIcon,
  },
  {
    title: "Learn from community",
    details:
      "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
    image: communityIcon,
  },
  {
    title: "Challenge yourself",
    details:
      "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
    image: robot,
  },
  {
    title: "Earn recognition",
    details:
      "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
    image: EarnIcon,
  },
];


 // Dummy data for hackathons
 export const hackathons = [
  {
    id: 1,
    title: 'Data Science Bootcamp - Graded Datathon',
    status: 'Upcoming',
    startTime: '00 : 15 : 22',
    image: img1,
  },
  {
    id: 2,
    title: 'Data Sprint 72 - Butterfly Identification',
    status: 'Past',
    endedOn: '2023-05-12T21:00:00', // Updated to ISO format
    image: img2,
  },
  {
    id: 3,
    title: 'Data Sprint 71 - Weather Recognition',
    status: 'Active',
    endTime: '01 : 17 : 10',
    image: img3,
  },
  {
    id: 4,
    title: 'AI Innovations Challenge - Autonomous Vehicles',
    status: 'Upcoming',
    startTime: '02 : 25 : 00',
    image: img4,
  },
  {
    id: 5,
    title: 'Healthcare Hackathon - Cancer Detection',
    status: 'Past',
    endedOn: '2022-05-16T21:00:00', // Updated to ISO format
    image: img5,
  },
  {
    id: 6,
    title: 'FinTech Data Sprint - Fraud Detection',
    status: 'Active',
    endTime: '04 : 05 : 30',
    image: img6,
  },
];

