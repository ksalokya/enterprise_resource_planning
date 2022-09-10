import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

import Document from '../../components/editor/Document'

import './editor.css'

function Editor(props) {
  return (
    <div className="editor">
      <Sidebar />
      <div className="editor-container">
        <Navbar handle={props.handle} />
        <div className="editor-component">
          <Document />
        </div>
      </div>
    </div>
  )
}

export default Editor