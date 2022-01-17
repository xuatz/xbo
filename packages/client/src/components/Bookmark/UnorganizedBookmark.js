import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Wrapper, ActionToolbar, Tag } from './styles'
import Push from './Push'
import InvisibleInput from '../common/InvisibleInput'

const Tags = (props) => {
  let { tags, onTagAdded, onTagRemoved } = props
  let [tagInput, setTagInput] = useState('')
  let [selectedTag, setSelectedTag] = useState(null)

  const handleOnTagChange = (e) => {
    setTagInput(e.target.value)
  }

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput) {
      onTagAdded(tagInput)
      setTagInput('')
    }
    if (e.key === 'Backspace' && !tagInput) {
      onTagRemoved()
    }
  }

  const handleOnTagClick = (tag) => (e) => {
    setSelectedTag(tag)
  }

  const handleOnTagKeyPress = (tag) => (e) => {
    if (e.key === 'Backspace') {
      onTagRemoved(tag)
      setSelectedTag(null)
    }
  }

  return (
    <div>
      {tags.map((tag) => (
        <Tag
          tabIndex={-1}
          onClick={handleOnTagClick(tag)}
          onKeyUp={handleOnTagKeyPress(tag)}
          key={tag}
          isSelected={tag === selectedTag}
        >
          {tag}
        </Tag>
      ))}
      <InvisibleInput
        type="text"
        placeholder="tags (e.g. bitcoin, react, anime, ...)"
        value={tagInput}
        onChange={handleOnTagChange}
        onKeyUp={handleOnKeyPress}
      />
    </div>
  )
}

Tags.propTypes = {
  tags: PropTypes.array,
  onTagAdded: PropTypes.func,
  onTagRemoved: PropTypes.func,
}

Tags.defaultProps = {
  tags: [],
  onTagAdded: () => {},
  onTagRemoved: () => {},
}

// An unorganized bookmark
export default class UnorganizedBookmark extends React.Component {
  state = {
    tags: this.props.bk.tags || [],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bk.tags !== nextProps.bk.tags) {
      this.setState({ tags: nextProps.bk.tags })
    }
  }

  handleOnTagAdded = (newTag) => {
    this.setState((prevState) => {
      let tags = !prevState.tags.includes(newTag)
        ? prevState.tags.concat(newTag)
        : prevState.tags
      this.props.onTagsUpdated(tags)
      return {
        tags,
      }
    })
  }

  handleOnTagRemoved = (tagToRemove) => {
    this.setState((prevState) => {
      let tags = tagToRemove
        ? prevState.tags.filter((tag) => tag !== tagToRemove)
        : prevState.tags.slice(0, -1)
      this.props.onTagsUpdated(tags)
      return {
        tags,
      }
    })
  }

  render() {
    let { tags } = this.state
    let { bk } = this.props
    return (
      <Wrapper>
        <Push data={bk.data} />
        <Tags
          tags={tags}
          onTagAdded={this.handleOnTagAdded}
          onTagRemoved={this.handleOnTagRemoved}
        />
        <ActionToolbar>
          <button>Mark as read</button>
          <button
            onClick={(event) => {
              this.props.actions.deleteBookmark(bk._id)
            }}
          >
            Delete
          </button>
        </ActionToolbar>
      </Wrapper>
    )
  }
}
