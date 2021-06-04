import { connect } from 'react-redux';
import { logout } from '../../actions/session-actions';
import AuthNavbar from './AuthNavBar';

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthNavbar);
