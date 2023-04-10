import { useSelector } from 'react-redux'
import { LoggedUserTabs, GuestTabs } from './bottomTabNavigator.js'

export default function SwitchNavigator() {

    const userLoggedIn = useSelector((state) => state.user.userLoggedIn) // getter pour accéder au state

    return userLoggedIn ? <LoggedUserTabs /> : <GuestTabs />
}
