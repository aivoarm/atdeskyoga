import React from 'react';
import Sound from 'react-sound';

function control(text, clickHandler) {
  const onClick = ev => {
    ev.preventDefault();
    clickHandler();
  };
  return (
    <li>
        {text}
     
    </li>
  );
}

const numberFormat = new Intl.NumberFormat([], { minimumFractionDigits: 2 });

export default class PlayerControls extends React.Component {
  render() {
    return <div>{this.renderControls()}</div>;
  }

  renderControls() {
    const controls = {
      play: this.props.playStatus === Sound.status.STOPPED,
      stop: this.props.playStatus !== Sound.status.STOPPED,
      pause: this.props.playStatus === Sound.status.PLAYING,
      resume: this.props.playStatus === Sound.status.PAUSED
    };

    return (
      <div>
        <ul>
          {controls.play && control('Play', this.props.onPlay)}
          {controls.stop && control('Stop', this.props.onStop)}
          {controls.pause && control('Pause', this.props.onPause)}
          {controls.resume && control('Resume', this.props.onResume)}
        </ul>
        
        </div>
    );
  }
}