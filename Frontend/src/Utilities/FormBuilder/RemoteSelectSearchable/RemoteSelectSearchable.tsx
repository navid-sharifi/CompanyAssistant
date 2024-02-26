import React, { FC, useEffect, useState } from "react";
import { Http } from "../../../Model/Enums/Http";
import useHttpClient from "../../Http/useHttpClient";
import { CasheContext } from "../../../Contexts/CasheContext";
import Select from 'react-select'
import { toast } from "react-toastify";
import { HttpResponseModel } from "../../Http/Models";



interface RemoteSelectSearchableProps {
    httpMethod?: Http,
    url: string,
    Key: string,
    noCash?: boolean,
    dispalyField?: string,
    ComplexDispalyField?: (date: any) => string,
    placeholder?: string,
    value?: string | number | readonly string[] | undefined;
    onChange: (value: string) => void
    onObjectChange?: (item: any) => void,
    OnChangeWithDetil?: (value: any, itemObj: any) => void,
    isDisabled?: boolean
}

export const RemoteSelectSearchable: FC<RemoteSelectSearchableProps> = ({
    httpMethod = Http.GET,
    url,
    Key,
    dispalyField,
    ComplexDispalyField,
    placeholder = '',
    value,
    onChange,
    noCash,
    onObjectChange,
    isDisabled = false,
    OnChangeWithDetil
}) => {

    const { isLoading, send } = useHttpClient<HttpResponseModel<any[]>>();

    const [Items, setItems] = useState<any[]>();

   

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
          
        });
        if (response) {

            var rows = response.data;
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

    var item = newItems && newItems.length > 0 ? newItems.filter(c => c.value == value)[0] ?? null : null;

    return <>
        <Select

            isDisabled={isDisabled}
            placeholder={placeholder}
            menuPosition="fixed"
            menuShouldBlockScroll={true}
            menuShouldScrollIntoView
            menuPortalTarget={document.body}
            styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 })
            }}
            isClearable
            options={newItems}
            value={item}
            onChange={(e) => {
                var item;
                if (e?.value)
                    item = Items?.filter(c => c[Key] === e?.value)[0]
                onObjectChange && onObjectChange(item)

                onChange(e?.value)
                OnChangeWithDetil && OnChangeWithDetil(e?.value, item)
            }}
            isLoading={isLoading}

        />
    </>
}