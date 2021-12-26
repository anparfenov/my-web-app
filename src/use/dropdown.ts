import { createPopper } from "@popperjs/core";
import { Ref, ref } from "vue";

import { isElement } from "@/utils";

export function useDropdown({button, buttonClass, dropdown}: DROPDOWN.UseDropdownProps): DROPDOWN.UseDropdownReturn {
    let _popperInstance: any = null;
    let _button = button;
    let _show = ref(false);
    // let _dropdown = dropdown;
    // let _buttonClass = buttonClass;

    let _dropdown = checkDropdown(dropdown);

    function checkDropdown(dropdown: Ref<HTMLDivElement | null>) {
        if (dropdown && dropdown.value) {
            return isElement(dropdown.value) ? dropdown.value : dropdown.value.$refs.dropdown;
        }
        return "";
    }

    function update(dropdown: Ref<HTMLDivElement | null>, show: Ref<boolean>) {
        _dropdown = checkDropdown(dropdown);
        _show.value = show.value;
    }

    function create() {
        if (button.value) {
            _popperInstance = createPopper(button.value, _dropdown, {
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, 8],
                        },
                    },
                ],
            });
        }
    }

    function destroy() {
        if (_popperInstance) {
            _popperInstance.destroy();
            _popperInstance = null;
        }
    }

    function handleDocClick({ target }: Event) {
        if (target && _button.value) {
            if (_button.value.contains(target as Node) || _dropdown.contains(target)) {
                return;
            }
            _show.value = false;
            _button.value.classList.toggle(buttonClass);
            toggle();
        }
    }

    /*
     * toggle dropdown
     * @param { boolean } show dropdown
     * @param { HTMLElement } button that triggers function
     */
    function toggle() {
        console.log("toggle dropdown", _dropdown);
        if (_show.value) {
            create();
            document.addEventListener("click", handleDocClick);
        } else {
            destroy();
            document.removeEventListener("click", handleDocClick);
        }
    }

    function show() {
        if (_show.value) {
            create();
            document.addEventListener("click", handleDocClick);
        }
    }

    function hide() {
        if (_popperInstance) {
            destroy();
            document.removeEventListener("click", handleDocClick);
        }
    }

    return {
        toggle,
        update,
        show,
        hide,
    };
}
