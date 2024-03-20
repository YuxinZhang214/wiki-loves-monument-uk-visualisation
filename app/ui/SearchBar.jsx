import { Input } from "@nextui-org/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({searchTerm,setSearchTerm}) => {
    return (
        <Input
            isClearable
            fullWidth
            placeholder="Search..."
            startContent={<FontAwesomeIcon icon={faSearch} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            clearable
        />
    )
}

export default SearchBar