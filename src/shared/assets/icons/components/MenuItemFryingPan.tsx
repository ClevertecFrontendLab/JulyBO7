import { Icon, IconProps } from '@chakra-ui/react';
import { memo } from 'react';

const SvgMenuItemFryingPan = (props: IconProps) => (
    <Icon
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        {...props}
    >
        <rect width='24' height='24' fill='url(#pattern0_6002_19565)' />
        <defs>
            <pattern
                id='pattern0_6002_19565'
                patternContentUnits='objectBoundingBox'
                width='1'
                height='1'
            >
                <use
                    xlinkHref='#image0_6002_19565'
                    transform='translate(0.153895 0.125) scale(0.0078125)'
                />
            </pattern>
            <image
                id='image0_6002_19565'
                width='96'
                height='96'
                preserveAspectRatio='none'
                xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVR4nO3aPa9MURSH8cdLaBSIaIWKQkOjuqFQUOjFTSQKnUIkEoX4BkSLRqIUiU/gpaUVEoVvQMKNCGHLSeaWe27BnLXWOc8vWd1ksvf6zz5rzpwBSZIkSZIkSZIkSZI0aa1TMoB5aJ4AA5i15gkwgFl/otuKXz87BhDMAIIZQDADCGYAwQwgmAEEM4BgBhDMAIIZQDADCGYAwQwgmAEEM4BgBhDMAIIZQDADCFYlgN3AryXv9z9rVFUCODlS8w2g48pUA6jivgHEemkAcbYBnw0gzqFO838AOwPXNRsXOgG8iV7YXNzuBPCIBO6OeG1syeoaCVxK0IgWVGskcDRBI1pA/QH2ksB24GuChrSR6xOJvE7QkDZyPSORewka0kauOySy3lnkK+p739nbWRI51lnkt8WMqGoP8LuztwMksmwQD9+SqlqrMIC3GsTDfUJV1zt7ekpCvUE83ClX9aSzp1skNMVB/KHCAN5qEA+zYRf17KsygDftWDKIL1PPzUoDeNPzzqI3gKvAfvI7CNwAfnb28oDELia4Q20rrjMkNlyG3iVoUltRDQ/m0zuxeFbaJlZfgMMUcQ74PrHmn6KY48DbBM1r/1gvgCMU/j/NeeAx8LHIqdhY/AL6EDgd3UBJkiRJkiRJkiSJ2fgLtf6eqlr3ZxsAAAAASUVORK5CYII='
            />
        </defs>
    </Icon>
);
const Memo = memo(SvgMenuItemFryingPan);

export default Memo;
