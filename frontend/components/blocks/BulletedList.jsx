import React from 'react';
import ContentEditable from 'react-contenteditable';
import { debounce } from '../../util/utils';

class BulletedList extends React.Component {
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
    this.setState({ html: e.target.value }, () => {
      const newBlock = Object.assign(this.props.block, { text: this.state.html });
      this.props.updateBlock(newBlock);
    });
  }

  render() {
    return (
      <div className="block-body">
        {/* add bulleted list styling */}
        <ContentEditable
          innerRef={this.contentEditable}
          html={this.state.html}
          onChange={debounce(this.handleChange, 1000)}
          tagName="div"
          className="bulleted-list"
          placeholder="List"
        />
      </div>
    );
  }
}

export default BulletedList;
