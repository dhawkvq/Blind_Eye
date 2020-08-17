import { useState, useEffect, useRef } from 'react';

export function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event: Event) => {
      if (ref.current) {
        if(!ref.current.contains(event.target)){
            setIsComponentVisible(false);
          } 
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}