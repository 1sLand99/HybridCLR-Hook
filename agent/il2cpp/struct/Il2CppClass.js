import {NativeStruct} from "./NativeStruct";
import {il2cppApi} from "../il2cppApi";
import {log} from "../../logger";

export class Il2CppClass extends NativeStruct {

    name() {
        return il2cppApi.il2cpp_class_get_name(this).readCString();
    }

    namespaze() {
        return il2cppApi.il2cpp_class_get_namespace(this).readCString();
    }

    flags() {
        return il2cppApi.il2cpp_class_get_flags(this);
    }

    getFullName() {
        let name1 = this.name();
        if (name1.indexOf("`") !== -1) {
            let split = name1.split("`");
            name1 = split[0];
            name1 = name1 + this.getGenericName();
        }
        return name1;
    }

    valueType() {
        return il2cppApi.il2cpp_class_is_valuetype(this);
    }

    enumType() {
        return il2cppApi.il2cpp_class_is_enum(this);
    }

    isGeneric() {
        return il2cppApi.il2cpp_class_is_generic(this);
    }

    /**
     * class_type
     */
    getType() {
        return il2cppApi.il2cpp_class_get_type(this);
    }

    getElementClass() {
        return il2cppApi.il2cpp_class_get_element_class(this);
    }

    getDeclaringType() {
        return il2cppApi.il2cpp_class_get_declaring_type(this);
    }

    filedCount() {
        return il2cppApi.il2cpp_class_num_fields(this);
    }

    /**
     *
     * @returns {Il2CppType}
     */
    getEnumBaseType() {
        return il2cppApi.il2cpp_class_enum_basetype(this);
    }

    getFieldsInfo(iter) {
        return il2cppApi.il2cpp_class_get_fields(this, iter);
    }

    getProperties(iter) {
        return il2cppApi.il2cpp_class_get_properties(this, iter);
    }

    getMethods(iter) {
        return il2cppApi.il2cpp_class_get_methods(this, iter);
    }

    /**
     * 获取泛型参数名
     * @returns {string}
     */
    getGenericName() {
        let type = this.getType();
        let name = this.name();
        if (name.indexOf("`") !== -1) {
            // log("获取Type:Il2cpp:"+this.name() +" nameSpaze:"+this.namespaze());
            let il2cppTypeGetName = type.getName();
            if (il2cppTypeGetName == null) {
                return name;
            }
            let split = name.split("`");
            name = split[0];
            let indexOf = il2cppTypeGetName.indexOf(name);
            let s = il2cppTypeGetName.substr(indexOf + name.length, il2cppTypeGetName.length - name.length);
            let genericT = "\<System.Object\>";
            // log(" genericT:"+genericT);
            if (s === genericT) {
                return "\<T\>";
            }
            return s;
        }
        return name;
    }

    parent() {
        return new Il2CppClass(il2cppApi.il2cpp_class_get_parent(this));
    }

    getInterfaces(iter) {
        return il2cppApi.il2cpp_class_get_interfaces(this, iter);
    }
}