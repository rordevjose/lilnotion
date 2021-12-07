import React from 'react';
import { withRouter } from 'react-router-dom';
import { debounce } from '../../util/utils';
import equal from 'fast-deep-equal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ContentEditable from 'react-contenteditable';
import BlockContainer from '../blocks/BlockContainer';
import PageHeaderContainer from './PageHeaderContainer';
import MediaMenuContainer from '../menus/MediaMenuContainer';
import { FiMenu, FiPlus } from 'react-icons/fi';
import { BiImage } from 'react-icons/bi';


class Page extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.newBlock = this.newBlock.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.getRandomCover = this.getRandomCover.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.OnDragEnd = this.OnDragEnd.bind(this);
    this.state = {
      pageId: props.location.pathname.slice(3),
      page: props.pages[this.props.location.pathname.slice(3)],
      html: '',
      photoFile: null,
      photoUrl: null,
      blocks: props.blocks,
    };
  }

  componentDidMount() {
    document.title = this.state.page.title;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('page.jsx componentDidUpdate()');
    // console.log("prevProps: ", prevProps);
    // console.log("new Props: ", this.props);

    const newPageId = this.props.location.pathname.slice(3);
    if (!equal(this.props.blocks, this.state.blocks) || this.props.location !== prevProps.location) {
      // console.log('inside componentDidUpdate() conditional');
      this.setState({
        pageId: newPageId,
        page: this.props.pages[newPageId],
        blocks: this.props.blocks,
      });
      document.title = this.state.page.title;
      // debugger;
    }
    // const htmlChanged = this.props.html !== this.state.html;
    // if (htmlChanged) {
    //   const newPage = Object.assign(this.props.page, { title: this.state.html });
    //   this.props.updatePage(newPage);
    // }
  }

  handleTitleChange(e) {
    const newPage = Object.assign(this.state.page, { title: e.target.value });
    this.setState({ page: newPage, html: e.target.value }, () => this.props.updatePage(newPage));
    document.title = e.target.value;
  }

  getRandomCover() {}

  newBlock() {
    const block = {
      userId: this.props.currentUser.id,
      pageId: this.props.location.pathname.slice(3),
      blockType: 'paragraph',
      text: '',
    };
    this.props.createBlock(block).then((res) => {
      // console.log("page before update: ", this.state.page)
      // console.log("blockids before update: ", this.state.page.blockIds)
      const newBlockIds = [...this.state.page.blockIds, res.block.id];
      const newPage = Object.assign(this.state.page, { blockIds: newBlockIds });
      console.log(newPage);
      this.props.updatePage(newPage);
    });
  }

  handlePreview(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        this.setState(
          {
            photoFile: file,
            photoUrl: fileReader.result,
          },
          () => this.handleUpload()
        );
      };
    }
  }

  handleUpload() {
    const file = this.state.photoFile;

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = () => {
        const formData = new FormData();
        formData.append('page[uploadedImageUrl]', file);

        $.ajax({
          url: `/api/pages/${this.state.page.id}`,
          method: 'PATCH',
          data: formData,
          contentType: false,
          processData: false,
        }).then(
          (res) => console.log('res: ', res),
          (err) => console.log('error: ', err)
        );
      };
    }
  }

  OnDragEnd(result) {
    const { source, destination } = result;
    // if dropped outside the area or no movement
    if (!destination || source.index === destination.index) return;
    // reorder blocks ids (splice >1 if implementing multi-drag)
    const blockIds = this.state.page.blockIds;
    const newBlockIds = [...blockIds];
    const removed = newBlockIds.splice(source.index, 1);
    newBlockIds.splice(destination.index, 0, ...removed);
    const newPage = Object.assign(this.state.page, { blockIds: newBlockIds });
    this.setState({ page: newPage }, () => this.props.updatePage(newPage));
    console.log(newBlockIds);
  }

  getPagePadding() {}

  render() {
    console.log('page.jsx render()');
    const { pages, blocks, location, history } = this.props;

    if (!pages || !blocks) return null;
    if (location.pathname.length <= 1) {
      const firstPage = Object.values(pages)[0];
      history.push(`/p/${firstPage.id}`);
      return null;
    }

    const page = pages[location.pathname.slice(3)];
    const orderedBlocks = [];
    const blockIds = page.blockIds;
    for (let i = 0; i < blockIds.length; i++) {
      orderedBlocks.push(blocks[blockIds[i]]);
    }

    const pageHasGalleryCover = this.state.page.galleryImageUrl.length > 0;
    const pageHasUploadedCover = this.state.page.uploadedImageUrl.length > 0;
    const preview = this.state.photoUrl ? <img className="page-cover-preview" src={this.state.photoUrl} /> : null;

    return (
      <div className="page">
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-menu-wrapper">
              <FiMenu className="topbar-menu" />
            </div>
            <div className="breadcrumb-wrapper">
              <div className="breadcrumb">{page.title}</div>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="more-button-wrapper">
              <div className="more-button">
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-scroller">
          <div className="page-header-wrapper">
            <div className="page-header">
              {pageHasGalleryCover ? (
                <img src={page.galleryImageUrl} className="page-cover" />
              ) : null}
            </div>
          </div>

          <div className="temp-picker">
            <label className="cover-upload-label">
              <BiImage className="image-upload-icon" />
              Add cover
              <input
                type="file"
                id=""
                className="cover-upload-input"
                accept="image/*"
                onChange={this.handlePreview}
                hidden
              />
            </label>
          </div>

          <PageHeaderContainer page={this.state.page} />

          <div className="page-wrapper">
            <div className="page-title-wrapper">
              <ContentEditable
                innerRef={this.contentEditable}
                // html={this.state.html}
                html={this.state.page.title}
                onChange={debounce((e) => this.handleTitleChange(e), 500)}
                tagName="h1"
                placeholder="Untitled"
                className="page-title"
                id="page-title"
              />
              <div className="add-block-button" onClick={() => this.newBlock()}>
                <FiPlus />
              </div>
            </div>

            <DragDropContext onDragEnd={(result) => this.OnDragEnd(result)}>
              <div className="page-body">
                <Droppable droppableId={this.state.pageId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="droppable-area"
                    >
                      {orderedBlocks.map((block, index) => (
                        <BlockContainer key={block.id} block={block} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Page);
