import React from 'react';
import ContentEditable from 'react-contenteditable';
import { debounce } from '../../util/utils';

class Heading3 extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      html: this.props.block.text,
      placeholder: '',
    };
  }

  handleChange(e) {
    this.setState({ html: e.target.value });
  }

  render() {
    return (
      <div className="block-body">
        <ContentEditable
          innerRef={this.contentEditable}
          html={this.state.html}
          onChange={debounce(this.handleChange, 1000)}
          tagName="h3"
          className="h3"
          placeholder="Heading 3"
        />
      </div>
    );
  }
}

export default Heading3;
