import { FC } from "react";
import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';



export const GroupCheckBox: FC<{
    Items: { key: string; value: string; }[];
    
    value?: string | number | readonly string[] | undefined;
    onChange: (data: any) => void;
    ComplexDispalyField?: (date: any) => string;

}> = ({
    Items, value, onChange,
}) => {

        var _values = value as string[] ?? [];

        const _OnChangeAdd = (key: string) => onChange([..._values, key]);

        const _OnChangeRemove = (key: string) => onChange([..._values.filter(c => c !== key)]);

        return <FormGroup row>
           
            {Items && Items.length > 0 && Items.map((item, counter) => _values.some(c => c === item.key) ?
                <FormControlLabel control={<Checkbox checked />} onClick={() => _OnChangeRemove(item.key)} label={item.value} /> :
                <FormControlLabel control={<Checkbox />} onClick={() => _OnChangeAdd(item.key)} label={item.value} />)}
        </FormGroup>;

    };
