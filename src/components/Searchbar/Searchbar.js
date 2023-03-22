// import PropTypes from 'prop-types';
import {
  SearchbarStyle,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import Notiflix from 'notiflix';



export function Searchbar({ onSubmit }) {
  const [name, setName] = useState('');

  const handleNameChange = event => {
    setName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.trim() === '') {
      Notiflix.Notify.failure(`Please enter a name`);
      return;
    }
    onSubmit(name);
    setName('');
  };

  return (
    <SearchbarStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>
            <AiOutlineSearch size={30} />
          </SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchbarStyle>
  );
}


// export class Searchbar extends Component {
//   state = {
//     name: '',
//   };

//   handleNameChange = event => {
//     this.setState({ name: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.name.trim() === '') {
//       Notiflix.Notify.failure(`Please enter a name`);
//       return;
//     }
//     this.props.onSubmit(this.state.name);
//     this.setState({ name: '' });
//   };

//   render() {
//     return (
//       <SearchbarStyle>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormButton type="submit">
//             <SearchFormButtonLabel>
//               <AiOutlineSearch size={30} />
//             </SearchFormButtonLabel>
//           </SearchFormButton>
//           <SearchFormInput
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.name}
//             onChange={this.handleNameChange}
//           />
//         </SearchForm>
//       </SearchbarStyle>
//     );
//   }
// }
