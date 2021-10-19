// import React from "react";
// import { Frame } from "framer";

// const Phone = ({ children }) => {
//   const screenWidth = 375;
//   const screenHeight = (screenWidth * 19.5) / 9 - 10;
//   const phoneWidth = screenWidth + 50;
//   const phoneHeight = (375 * 19.5) / 9 + 40;
//   return (
//     <Frame
//       width={phoneWidth}
//       height={phoneHeight}
//       borderRadius={30}
//       center
//       background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2F510px-IPhone_X_vector.svg.png)"
//       style={{ backgroundSize: "cover" }}
//     >
//       {/* Screen enclosure */}
//       <Frame
//         background="white"
//         width={screenWidth}
//         height={screenHeight}
//         left={(phoneWidth - screenWidth) / 2}
//         top={25}
//         overflow="hidden"
//         borderRadius={33}
//       >
//         {children}
//       </Frame>
//     </Frame>
//   );
// };

// export default Phone;
