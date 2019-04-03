import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { mainActions } from "./actions";
import { RootState } from "./reducers";
import { MainModel } from "./models";
import { omit } from "./utils";
import { Left, Right, Header } from "./components";

const MODE_VALUES = (Object.keys(MainModel.Mode) as (keyof typeof MainModel.Mode)[]).map(
  key => MainModel.Mode[key]
);

export namespace App {
  export interface Props {
    main: RootState.mainState;
    actions: mainActions;
    // mode: MainModel.Mode;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, "actions" | "main"> => {
    const hash = ownProps.location && ownProps.location.hash.replace("#", ""); // ???
    const mode = MODE_VALUES.find(value => value === hash) || MainModel.Mode.SHOW_SERVICE;
    return { main: state.main, mode };
  },
  (dispatch: Dispatch): Pick<App.Props, "actions"> => ({
    actions: bindActionCreators(omit(mainActions, "Type"), dispatch)
  })
)
export default class App extends React.Component<App.Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    // const {
    //   trail,
    //   targetIP,
    //   filePath,
    //   mode,
    //   serviceList,
    //   messageList,
    //   serverResponse,
    //   responseMetrics,
    //   selectedService,
    //   selectedRequest,
    //   connectType,
    //   serviceRecommendations,
    //   serviceTrieInput
    // } = this.props.main;
    // const {
    //   handleIPInput,
    //   handleProtoUpload,
    //   setMode,
    //   handleServiceClick,
    //   handleRequestClick,
    //   handleServiceTrie,
    // } = this.props.actions;
    return (
      <div className="wrapper">
        <Header {...this.props.main} />
        <div className="app">
          <Left {...this.props.main} {...this.props.actions} />
          <Right {...this.props.main} />
        </div>
      </div>
    );
  }
}
