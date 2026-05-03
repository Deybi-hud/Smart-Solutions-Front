function Text({ children, variant = "p", className = "" }) {
    const Tag = variant;
    return <Tag className={className}>{children}</Tag>
}

export default Text;