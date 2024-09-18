// const DotIcon = () => {
//   return (
//     <svg fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
//       <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
//     </svg>
//   );
// };

// const CustomPage = () => {
//   return (
//     <div>
//       <h1>Custom Profile Page</h1>
//       <p>This is the custom profile page</p>
//     </div>
//   );
// };

// const UserProfilePage = () => (
//   <UserProfile path="/players" routing="path">
//     {/* You can pass the content as a component */}
//     <UserProfile.Page label="Custom Page" labelIcon={<DotIcon />} url="custom-page">
//       <CustomPage />
//     </UserProfile.Page>

//     {/* You can also pass the content as direct children */}
//     <UserProfile.Page label="Terms" labelIcon={<DotIcon />} url="terms">
//       <div>
//         <h1>Custom Terms Page</h1>
//         <p>This is the custom terms page</p>
//       </div>
//     </UserProfile.Page>
//   </UserProfile>
// );

export default function PlayerProfilePage() {
  return (
    <div>
      <h1>Player Profile Page</h1>
      <p>This is a players profile page</p>
    </div>
  );
}
