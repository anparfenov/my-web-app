import { Ref } from "vue";

export type UseDropdownProps = {
    button: Ref<HTMLButtonElement | null>;
    buttonClass: string;
    dropdown: Ref<HTMLDivElement | null>;
}

export type UseDropdownReturn = {
    toggle: () => void;
    update: (dropdown: Ref<HTMLDivElement | null>, show: Ref<boolean>) => void;
    show: () => void;
    hide: () => void;
}

export as namespace DROPDOWN;
