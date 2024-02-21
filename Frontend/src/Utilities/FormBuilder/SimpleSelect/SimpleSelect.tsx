
import ReactSelect from 'react-select'
import { FC } from "react";
import { Box } from '@mui/material';



interface SimpleSelectProps {
    Items: { key: string, value: string }[],
    placeholder?: string,
    value?: string | number | readonly string[] | undefined;
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
    ComplexDispalyField?: (date: any) => string,
}

export const SimpleSelect: FC<SimpleSelectProps> = ({
    Items,
    placeholder = 'یک آیتم را انتخاب کنید',
    value,
    onChange,
    ComplexDispalyField
}) => {
    return <Box>

    </Box>
}


interface SimpleSelectSearchableProps {
    Items: { key: string, value: string }[],
    placeholder?: string,
    value?: string | number | readonly string[] | undefined;
    onChange: (data: any) => void;
    ComplexDispalyField?: (date: any) => string,
    isSearchable?: boolean
}

export const SimpleSelectSearchable: FC<SimpleSelectSearchableProps> = ({
    Items,
    placeholder ,
    value,
    onChange,
    isSearchable = true
}) => {


    var newItems = Items ? Items.map((item) => {
        return {
            'value': item.key,
            'label': item.value
        }
    }
    ) : [];

    var item = newItems && newItems.length > 0 ? newItems.filter(c => c.value == value)[0] ?? null : null;

    return <ReactSelect
        menuPosition="fixed"
        placeholder={placeholder}
        menuShouldBlockScroll={true}
        menuShouldScrollIntoView
        menuPortalTarget={document.body}
        styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 })
        }}
        isClearable
        isSearchable={isSearchable}
        value={item}
        onChange={(e) => onChange(e?.value)}
        options={newItems} />
}



