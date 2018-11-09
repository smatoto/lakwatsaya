import React from 'react';
import { css } from 'react-emotion';
import { CircleLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
class Preloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <CircleLoader
          className={override}
          sizeUnit={"px"}
          size={300}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default Preloader;
