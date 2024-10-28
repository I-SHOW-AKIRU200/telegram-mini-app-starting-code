export const levelNames = [
  "Bronze", // From 0 to 4999 coins
  "Silver", // From 5000 coins to 24,999 coins
  "Gold", // From 25,000 coins to 99,999 coins
  "Platinum", // From 100,000 coins to 999,999 coins
  "Diamond", // From 1,000,000 coins to 2,000,000 coins
  "Epic", // From 2,000,000 coins to 10,000,000 coins
  "Legendary", // From 10,000,000 coins to 50,000,000 coins
  "Master", // From 50,000,000 coins to 100,000,000 coins
  "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
  "Lord", // From 1,000,000,000 coins to ∞
];

export const levelMinPoints = [
  0, // Bronze
  5000, // Silver
  25000, // Gold
  100000, // Platinum
  1000000, // Diamond
  2000000, // Epic
  10000000, // Legendary
  50000000, // Master
  100000000, // GrandMaster
  1000000000, // Lord
];

export const levelImages = [
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc1.png?alt=media&token=346b3ac8-7cab-4b5b-9ab6-184d3bd73a2b",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc8.png?alt=media&token=44324ebb-dd97-42c5-ba7d-5641802b8b98",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc6.png?alt=media&token=9df34b34-8d47-40a8-99cd-893e4aa40480",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc2.png?alt=media&token=08a0cb3a-1cb7-4f69-8d4c-63ec2d517da1",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc3.png?alt=media&token=af109670-55fb-4102-a888-55b63c1f59c9",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc4.png?alt=media&token=6bfb67cc-b06b-4192-ad22-935e53ab2ab8",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc5.png?alt=media&token=f83d8a88-688d-443c-b4e9-635c07821954",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc9.png?alt=media&token=a4418e3b-f7fc-4dca-9c5f-4d99cc954d89",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2Fbmc10%20(1).png?alt=media&token=95fcadf0-c46b-4103-90c9-03bf9d4ca49f",
  "https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2FIMG_2169.PNG?alt=media&token=08cfbf75-0000-4307-90e9-f2ee1007c447",
];

export function calculateUserLevel(points: number): number {
  // Check if points are greater than or equal to the maximum level points
  if (points >= levelMinPoints[levelMinPoints.length - 1]) {
    return levelMinPoints.length - 1; // Return the index of the highest level (Lord)
  }

  // Iterate through levelMinPoints to find the corresponding level
  for (let i = levelMinPoints.length - 1; i >= 0; i--) {
    if (points >= levelMinPoints[i]) {
      return i; // Return the index of the level
    }
  }
  return 0; // Default to the lowest level (Bronze) if no match is found
}
