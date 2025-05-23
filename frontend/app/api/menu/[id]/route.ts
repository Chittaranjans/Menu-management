import { NextRequest, NextResponse } from 'next/server';

const fetchMenuById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/menus/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response || !response.ok) {
      throw new Error(`Failed to fetch menu details: ${response ? response.statusText : 'No response'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu details:', error);
    throw error;
  }
};

const updateMenuById = async (id: string, updatedMenu: { name: string; parentId: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/menus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedMenu.name,
        parentId: updatedMenu.parentId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update menu: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating menu:', error);
    throw error;
  }
};

const deleteMenuById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/menus/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete menu: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting menu:', error);
    throw error;
  }
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Missing menu ID',
      }, {
        status: 400,
      });
    }

    const menu = await fetchMenuById(id);
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch menu',
    }, {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Missing menu ID',
      }, {
        status: 400,
      });
    }

    const updatedMenu = await req.json();

    if (!updatedMenu || !updatedMenu.name) {
      return NextResponse.json({
        success: false,
        message: 'Missing required menu details',
      }, {
        status: 400,
      });
    }

    const updatedMenuDetails = await updateMenuById(id, updatedMenu);

    return NextResponse.json({
      success: true,
      message: 'Successfully updated menu',
      updatedMenu: updatedMenuDetails,
    }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update menu',
    }, {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Missing menu ID',
      }, {
        status: 400,
      });
    }

    const deleteMenu = await deleteMenuById(id);

    return NextResponse.json({
      success: true,
      message: 'Successfully deleted menu',
      deleteMenu: deleteMenu,
    }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete menu',
    }, {
      status: 500,
    });
  }
}