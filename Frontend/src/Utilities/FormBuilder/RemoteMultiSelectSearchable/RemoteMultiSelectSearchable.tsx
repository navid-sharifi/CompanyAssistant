import React, { FC, useEffect, useState } from "react";
import { Http } from "../../../Model/Enums/Http";
import useHttpClient from "../../Http/useHttpClient";
import { CasheContext } from "../../../Contexts/CasheContext";
import Select, { OnChangeValue } from 'react-select'
import { toast } from "react-toastify";



interface RemoteSelectSearchableProps {
    httpMethod?: Http,
    url: string,
    Key: string,
    noCash?: boolean,
    dispalyField?: string,
    ComplexDispalyField?: (date: any) => string,
    placeholder?: string,
    value?: any;
    onChange: (value: any) => void
}

export const RemoteMultiSelectSearchable: FC<RemoteSelectSearchableProps> = ({

    httpMethod = Http.GET,
    url,
    Key,
    dispalyField,
    ComplexDispalyField,
    placeholder = 'یک آیتم را انتخاب کنید',
    value,
    onChange,
    noCash
}) => {

    const { isLoading, send } = useHttpClient();

    const [Items, setItems] = useState<any[]>();

    const [filter, setFilter] = useState<any>({
        "filter": null,
        "sorting": null,
        "skipCount": 0,
        "maxResultCount": 1000
    });

    const { cashe, setCashe } = React.useContext(CasheContext);
    /////fetch items
    const fetchItems = async () => {


        if (cashe[url]) {
            setItems(cashe[url])
            return;
        }



        const { response, errorMessage } = await send({
            method: httpMethod,
            url: url,
            data: filter,

        });
        if (response) {

            var rows = (response as any)?.result?.items as any[];
            setItems(rows)

            if (noCash !== true) {
                setCashe((r: any) => {
                    return { ...r, [url]: rows }
                })
            }

        } else if (errorMessage) {
            toast.error(errorMessage, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    useEffect(() => {
        fetchItems();
    }, [])

    var newItems = Items ? Items.map((item) => {
        return {
            'value': item[Key],
            'label': ComplexDispalyField ? ComplexDispalyField(item) : dispalyField ? item[dispalyField] : null
        }
    }
    ) : []

    var item = value && (value as string[]).length > 0 && newItems && newItems.length > 0 ? newItems.filter(c => (value as string[]).some(x => x === c.value)) ?? null : null;

    console.log(value)

    return <>
        <Select
            menuPosition="fixed"
            menuShouldBlockScroll={true}
            menuShouldScrollIntoView
            menuPortalTarget={document.body}
            styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 })
            }}
            isClearable
            isMulti
            options={newItems}
            value={item}
            onChange={(e) => onChange(e?.map(c => c.value))}
            isLoading={isLoading}

        />
    </>
}



