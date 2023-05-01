import { useState, useEffect } from "react";
import {
    DocumentEditorContainerComponent,
    Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
import Header from '../header/Header'
import useMediaQuery from '@mui/material/useMediaQuery';
import './document.css'

DocumentEditorContainerComponent.Inject(Toolbar);

function Document() {

    const matches = useMediaQuery('(max-width:900px)');
    const [displayPropertiesPane, setDisplayPropertiesPane] = useState(true);
    useEffect(() => {
        if (matches) setDisplayPropertiesPane(false);
        else setDisplayPropertiesPane(true);
    }, [matches])

    return (
        <div className='document'>
            <Header title='Editor' />
            <DocumentEditorContainerComponent
                height={'82%'}
                serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                enableToolbar={true}
                showPropertiesPane={displayPropertiesPane}
                enableAutoFocus={false}
            />
        </div>
    )
}

export default Document