import React from "react";
import styles from "./Information.module.css";
import { connect } from "react-redux";

function InformationLayout({ result }) {
  return <div className={styles["container"]}>{result.text}</div>;
}

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "ходит х" };
  }

  static getDerivedStateFromProps(props, state) {
    return (state.text = props.isDraw
      ? "ничья"
      : props.isGameEnded
      ? `победил ${props.currentPlayer}`
      : `ходит ${props.currentPlayer}`);
  }

  render() {
    return (
      <div>
        <InformationLayout result={this.state} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDraw: state.isDraw,
  isGameEnded: state.isGameEnded,
  currentPlayer: state.currentPlayer,
});

export default connect(mapStateToProps)(Information);
