import streamlit as st

def main():
    st.title("Product Information")
    
    # Input for Product Name
    product_name = st.text_input("Enter Product Name", "")
    
    # Dropdown for Category
    category_options = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Toys', 'Sports', 'Beauty', 'Other']
    category = st.selectbox("Select Category of the Product", category_options)
    
    if st.button("Submit"):
        if product_name and category:
            st.success(f"Product Name: {product_name}\nCategory: {category}")
        else:
            st.warning("Please fill in all fields.")

if __name__ == "__main__":
    main()
