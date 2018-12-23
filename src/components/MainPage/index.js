import React from "react";
import styled from "styled-components";
import Push from "./PushV2";

const Wrapper = styled.section`
  padding: 2em 6em;
  background: papayawhip;
`;

// props.actions.fetchBookmarks().then(res => {
//   // console.log("fetch complete!"); // TODO:XZ: will use this for infinite scroll in future
// });

const MainPage = props => {
  return (
    <Wrapper>
      <Push />
    </Wrapper>
  );
};

export default MainPage;

// const mapStateToProps = state => {
//   let bookmarks = [];

//   if (state.bookmarks.sublists) {
//     const { link, note } = state.bookmarks.sublists;
//     bookmarks = bookmarks
//       .concat(link)
//       .concat(note)
//       .sort((a, b) => b.data.modified - a.data.modified);
//   }

//   return {
//     bookmarks
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MainPage);
