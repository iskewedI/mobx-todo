import { useState } from 'react';
import FormInput from '../FormInput';
import FabIcon from '../common/FabIcon';
import Fade from '@mui/material/Fade';
import Plus from '../../static/images-svg/Plus.svg';
import './ExpandInput.css';

type Props = {
  onSubmit: (value: string) => void;
};

const ExpandInput = ({ onSubmit }: Props) => {
  const [expanded, setExpanded] = useState<boolean>();

  return (
    <div className='expand-input'>
      <FabIcon icon={Plus} title='Add' onClick={() => setExpanded(!expanded)} />

      {expanded && (
        <Fade
          in
          timeout={300}
          easing={{
            enter: 'cubic-bezier(.39,.9,.82,.86)',
            exit: 'cubic-bezier(.88,.26,.82,.86)',
          }}
        >
          <div className='expand-input__input'>
            <FormInput title='Add' onSubmit={onSubmit} />
          </div>
        </Fade>
      )}
    </div>
  );
};

export default ExpandInput;
