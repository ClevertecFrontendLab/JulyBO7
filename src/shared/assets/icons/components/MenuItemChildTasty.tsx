import { Icon, IconProps } from '@chakra-ui/react';
import { memo } from 'react';

const SvgMenuItemChildTasty = (props: IconProps) => (
    <Icon
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        {...props}
    >
        <rect width='24' height='24' fill='url(#pattern0_85_4914)' />
        <defs>
            <pattern
                // id='pattern0_85_4914'
                patternContentUnits='objectBoundingBox'
                width='1'
                height='1'
            >
                <use
                    xlinkHref='#image0_85_4914'
                    transform='translate(0.125 0.125) scale(0.0078125)'
                />
            </pattern>
            <image
                // id='image0_85_4914'
                width='96'
                height='96'
                preserveAspectRatio='none'
                xlinkHref='data:image/png;base64,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'
            />
        </defs>
    </Icon>

    // <Icon
    //     width='24'
    //     height='24'
    //     viewBox='0 0 24 24'
    //     fill='none'
    //     xmlns='http://www.w3.org/2000/svg'
    //     xmlnsXlink='http://www.w3.org/1999/xlink'
    //     {...props}
    // >
    //     <rect width='24' height='24' fill='url(#pattern0_6002_19741)' />
    //     <defs>
    //         <pattern
    //             id='pattern0_6002_19741'
    //             patternContentUnits='objectBoundingBox'
    //             width='1'
    //             height='1'
    //         >
    //             <use
    //                 xlinkHref='#image0_6002_19741'
    //                 transform='translate(0.125 0.125) scale(0.0078125)'
    //             />
    //         </pattern>
    //         <image
    //             id='image0_6002_19741'
    //             width='96'
    //             height='96'
    //             preserveAspectRatio='none'
    //             xlinkHref='data:image/png;base64,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'
    //         />
    //     </defs>
    // </Icon>
);
const Memo = memo(SvgMenuItemChildTasty);

export default Memo;
