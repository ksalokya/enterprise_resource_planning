import {
    DocumentEditorContainerComponent,
    Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
import Header from '../header/Header'
import './document.css'

DocumentEditorContainerComponent.Inject(Toolbar);

function Document() {
    return (
        <div className='document'>
            <Header title='Editor' />
            <DocumentEditorContainerComponent
                height={'84%'}
                serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                enableToolbar={true}
            />
        </div>
    )
}

export default Document