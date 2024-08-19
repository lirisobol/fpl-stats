import React from 'react';

// Assuming you have a type definition for PlayerData
import { PlayerData } from "../../../../models/general-info/Player";

interface CustomPlayerNameProps {
    data: PlayerData;  // This comes from AG-Grid row data
    value: string;     // This is the specific field value AG-Grid is handling, if needed
}

const CustomPlayerName: React.FC<CustomPlayerNameProps> = ({ data }) => {
    
    const jerseyImagePath = data ? `/assets/images/kits/${data.team_code}.png` : '/assets/images/kits/default.png';
    
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={jerseyImagePath} alt={`${data.team_code} Jersey`} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {data.first_name} {data.second_name}
        </div>
    );
}

export default CustomPlayerName;
