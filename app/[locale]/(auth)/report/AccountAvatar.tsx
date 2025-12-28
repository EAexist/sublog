interface AccountAvatarProps {
    name: string,
    bgClassName: string
}

const AccountAvatar = ({name, bgClassName}: AccountAvatarProps) => {

    console.log(name, bgClassName)
    return (
        <Avatar className={`w-6 h-6`}>
            <AvatarFallback className={`${bgClassName}`}>{name}</AvatarFallback>
        </Avatar>
    )
}

