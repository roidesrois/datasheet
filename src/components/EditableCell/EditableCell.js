import React from "react";
import { TextInput } from "../../components/Form";

class EditableCell extends React.Component {
    render() {
        const {
            cellData: { fieldType, fieldName, id, value },
            onEmployeesTableUpdate,
        } = this.props;

        return (
            <div>
                <TextInput
                    showErrors={false}
                    name={fieldName}
                    type={fieldType}
                    id={id}
                    onChange={onEmployeesTableUpdate}
                    value={value}
                />
            </div>
        );
    }
}

export default EditableCell;
